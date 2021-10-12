module.exports = {
    name: "deletecommands",
    description: "delete",
    options:[],
    guild:true,
    run:async(client, interaction)=>{
        if(interaction.user.id !== '827388013062389761')return interaction.reply({content:'You Are Not Allowed to Execute This Command', ephemeral:true})
        interaction.deferReply()
        await client.application.commands.fetch().then((command)=>command.delete())
        await client.guilds.cache.get(interaction.guild.id)?.commands.fetch().then((command)=>command.delete())
        interaction.editReply('Done')
    }}