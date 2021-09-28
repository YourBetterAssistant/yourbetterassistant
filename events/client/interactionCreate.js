'use strict';

const fs=require('fs')

const Discord=require('discord.js')
module.exports=async(client, interaction)=>{
    if(interaction.isCommand()){    
        let cmd=client.interactions.get(interaction.commandName)
        if(!cmd)return
        cmd.run(client, interaction, Discord)
}}