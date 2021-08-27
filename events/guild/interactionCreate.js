module.exports=async(client, interaction)=>{
    if (!interaction.isCommand()) return;
	if(interaction.commandName==='ping'){
        await interaction.reply({content:'Pinging...', ephemeral:true})
        setTimeout(function(){let e='e'}, 6000)
        await interaction.editReply({content:`Ping is ${Math.round(client.ws.ping)}ms`, ephemeral:true})
    }

}