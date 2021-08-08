const Levels = require("discord-xp");
module.exports = {
    name: "pos",
    description: "shows the position of a user on the leaderboard",
    category: "levels",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "<usage>",
    run:async(client, message, args)=>{
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.
        message.channel.send(`>>> *${user.position}*`)



    },
};