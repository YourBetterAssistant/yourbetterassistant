module.exports = {
    name: "deletecommands",
    description: "delete",
    options:[{type:5, name:'guildsonly', description:'Guild Only', required:true }],
    guild:true,
    run:async(client, interaction)=>{
        const guild=interaction.options?.getBoolean('guildsonly')
        if(interaction.user.id !== '827388013062389761')return interaction.reply({content:'You Are Not Allowed to Execute This Command', ephemeral:true})
        interaction.reply('Contacting API...')

        if(guild===true){
            await client.guilds.cache.get(interaction.guild.id)?.commands.fetch().then((command)=>command.delete())
        }
        else{
            await client.application.commands.fetch().then((command)=>command.delete())
            await client.guilds.cache.get(interaction.guild.id)?.commands.fetch().then((command)=>command.delete())
        }  
        interaction.followUp('Done')
    }}