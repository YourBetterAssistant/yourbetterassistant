const { forceAutoCacheMod } = require('../Utils/checkAutoMod');
const {newCache:clearCache}=require('../Utils/prefix-load')
module.exports = {
    name: "cacher",
    description: "Re-Caches The Bot",
    options:[],
    run:async(client, interaction)=>{
        if(interaction.user.id !== '827388013062389761')return interaction.reply({content:'You Are Not Allowed to Execute This Command', ephemeral:true})
        await client.guilds.fetch()
        await interaction.guild.members.fetch()
        await clearCache()
        await forceAutoCacheMod()
        interaction.reply('Done Recaching')

    }}