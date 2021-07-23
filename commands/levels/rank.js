const Levels=require('discord-xp')
const Discord=require('discord.js')
module.exports = {
    name: "rank",
    description: "Shows the rank of the user",
    category: "levels",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "rank [user]",
    run:async(client, message, args)=>{
        const canvacord = require('canvacord');

        const target = message.mentions.users.first() || message.author; // Grab the target.
        
            const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.
            
            const rank = new canvacord.Rank() // Build the Rank Card
                .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
                .setCurrentXP(user.xp) // Current User Xp
                .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
                .setRank(user.position) // Position of the user on the leaderboard
                .setLevel(user.level) // Current Level of the user
                .setStatus(target.presence.status)
                .setProgressBar("#FFFFFF")
                .setUsername(target.username)
                .setDiscriminator(target.discriminator);
        
            rank.build()
                .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
        
    },
};