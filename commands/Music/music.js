
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
const {prefix:globalPrefix}=require('../../botconfig/config.json')
module.exports = {
    name: "play",
    description: "Play music",
    aliases:['skip','stop','resume','pause','unpause', 'leave', 'join'],
    category: "Music",
    guildOnly: true,
    memberpermissions:["CONNECT", "SPEAK"],
    cooldown: 2,
    usage: "cmd [song]",
    run:async(client, message,args)=>{
        if(!message.author.id==='875335997565571072')return message.channel.send('This Command is now no longer supported.')
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

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);
        //If the user has used the play command
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
					message.reply('Error finding song.');
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
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice.connectTo
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(message.content.startsWith(`${prefix}skip`)) skip_song(message, server_queue);
        else if(message.content.startsWith(`${prefix}stop`)) stop_song(message, server_queue);
        else if(message.content.startsWith(`${prefix}resume`)) resume_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}pause`)) pause_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}unpause`))resume_song(message, server_queue)
        else if(message.content.startsWith(`${prefix}leave`)){
            voice_channel.leave();
            queue.delete(guild.id);
        }
        else if(message.content.startsWith(`${prefix}join`)){
            connectToChannel(message.member.voice.channel, message.guild.id)
            reply('I have joined', true, message)
        }
        else if(message.content.startsWith(`${prefix}clearqueue`)){
            queue.delete(message.guild.id)
            reply('Queue Cleared!', false, message)
        }


        
    }
    
}
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}
const pause_song=(message, server_queue)=>{
    if(server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused");//Checks if the song isn't paused.
    server_queue.connection.dispatcher.pause();//If the song is paused this will unpause it.
    message.channel.send("paused the song!");//Sends a message to the channel the command was used in after it unpauses.
}
const resume_song=(message, server_queue)=>{
    if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
    server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
    message.channel.send("Unpaused the song!");//Sends a message to the channel the command was used in after it unpauses.
}
async function connectToChannel(channel, guildID) {
	/*
		Here, we try to establish a connection to a voice channel. If we're already connected
		to this voice channel, @discordjs/voice will just return the existing connection for
		us!
	*/
	const connection = voice.joinVoiceChannel({
		channelId: channel.id,
		guildId: guildID,
	});

	/*
		If we're dealing with a connection that isn't yet Ready, we can set a reasonable
		time limit before giving up. In this example, we give the voice connection 30 seconds
		to enter the ready state before giving up.
	*/
	try {
		/*
			Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
			an error is thrown.
		*/
		await voice.entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		/*
			At this point, the voice connection is ready within 30 seconds! This means we can
			start playing audio in the voice channel. We return the connection so it can be
			used by the caller.
		*/
		return connection;
	} catch (error) {
		/*
			At this point, the voice connection has not entered the Ready state. We should make
			sure to destroy it, and propagate the error by throwing it, so that the calling function
			is aware that we failed to connect to the channel.
		*/
		connection.destroy();
		throw error;
	}
}