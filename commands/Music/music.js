const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
var { getData, getPreview } = require("spotify-url-info");
let guildPrefixes={}
const {reply}=require('../../exports')
//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();
const mongo=require('../../botconfig/mongo');
const voice=require('@discordjs/voice')
const prefixSchema = require('../../Schemas/prefixSchema');
const {prefix:globalPrefix}=require('../../botconfig/config.json');
const { erroHandler } = require('../../handlers/errorHandler');
const { MessageEmbed } = require('discord.js');
const player=voice.createAudioPlayer()
module.exports = {
    name: "play",
    description: "Play music",
    aliases:['skip','stop','resume','pause','unpause', 'leave', 'join', 'clearqueue', 'queue'],
    category: "Music",
    guildOnly: true,
    memberpermissions:["CONNECT", "SPEAK"],
    cooldown: 2,
    usage: "cmd [song]",
    run:async(client, message,args)=>{
        async function dbFind(){
            await mongo().then(async (mongoose)=>{
                try{
                    let result=await prefixSchema.findOne({_id:message.guild.id})
                    if(!result){
                        guildPrefixes[message.guild.id]=globalPrefix
                    }else{
                        guildPrefixes[message.guild.id]=result.prefix
                    }

                }finally{
                    mongoose.connection.close()
                }
            })
        }
        await dbFind()
        let prefix= guildPrefixes[message.guild.id] || globalPrefix
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const server_queue = queue.get(message.guild.id);
        if (message.content.startsWith(`${prefix}play`)){
            if (!args[0]) return message.channel.send('You need to send the second argument!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            }else if (args[0].includes('spotify')) {
				const spotifyTrackInfo = await getPreview(args[0]);

				const videoFinder = async (query) => {
					const videoResult = await ytSearch(query);
					return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
				};

				const video = await videoFinder(`${spotifyTrackInfo.title} ${spotifyTrackInfo.artist}`);

				if (video) {
					song = { title: video.title, url: video.url };
				} else {
					reply('That Song could not be found', true, message)
				}
			}else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    player:player,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = voice.joinVoiceChannel({
                        channelId: message.member.voice.channelId,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator,
                    });
                    queue_constructor.connection = connection;
                    await video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                console.log(server_queue.songs)
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }else if(message.content.startsWith(`${prefix}skip`))skip_song(message, server_queue, player)
        else if(message.content.startsWith(`${prefix}stop`))stop_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}pause`))pause_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}resume`))resume_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}unpause`))resume_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}continue`))resume_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}clearqueue`))queue.delete(message.guild.id)
        else if(message.content.startsWith(`${prefix}queue`))get_queue(message, server_queue)
        else if(message.content.startsWith(`${prefix}join`))join(message)
        else if(message.content.startsWith(`${prefix}leave`))leave(server_queue, message)

    }


}
const video_player = async (guild, song) => {
    const song_queue = await queue.get(guild.id);
    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        try{
        await player.stop()
        await song_queue.connection.destroy()
        
       await queue.delete(guild.id)
        return
    }catch(err){
            return
        }
        
    }
    song_queue.connection.subscribe(player)
    const stream = ytdl(song.url, { filter: 'audioonly' });
    const resource = voice.createAudioResource(stream)
    await song_queue.player.play(resource)
    song_queue.player.on(voice.AudioPlayerStatus.Idle, ()=>{song_queue.songs.shift();video_player(guild, song_queue.songs[0]);})
    /*.on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });*/
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}
const skip_song = (message, server_queue, player) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    player.stop();
}
const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.destroy();
}
const pause_song=(message, server_queue)=>{
    server_queue.player.pause();//If the song is paused this will unpause it.
    message.channel.send("paused the song!");//Sends a message to the channel the command was used in after it unpauses.
}
const resume_song=(message, server_queue)=>{
    server_queue.player.unpause();//If the song is paused this will unpause it.
    message.channel.send("paused the song!");//Sends a message to the channel the command was used in after it unpauses.
}
const get_queue=(message, server_queue)=>{
    let embed=new MessageEmbed()
    .setTitle('Queue');
    if(!server_queue??server_queue===undefined)return message.channel.send('There is nothing in the queue or a song is already playing')
    let first_song=server_queue.songs[0]
    embed.setDescription(` **Now Playing:** ${first_song.title}`)
    embed.setColor('GREEN')
    let songs=server_queue.songs
    let i=1
    songs.forEach(s=>{
        try{
        
        embed.addField(name=`Song ${i++}`, value=`${s.title}`)}catch(err){return}}

    )
    message.channel.send({embeds:[embed]})
    
}
const join=async (message)=>{
    await voice.joinVoiceChannel({
        channelId: message.member.voice.channelId,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
    });
}
const leave=async (server_queue, message)=>{
    if(!server_queue)return message.channel.send('I have not joined')
    await server_queue.connection.destory()

}