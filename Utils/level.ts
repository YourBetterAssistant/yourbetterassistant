import Levels from "discord-xp"
async function level(message){
    if(message.author.bot) return
    if(message.guild) return
    const randomAmountOfXp = Math.floor((Math.random() * 29) + 1)
    let hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
    if (!hasLeveledUp) return
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`)}
exports.level=level



    
