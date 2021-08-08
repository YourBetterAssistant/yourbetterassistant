//const {Calculator}=require('weky')
//const bt=require('discord-buttons')
const Discord=require('discord.js')
import {reply} from '../../index'
module.exports = {
    name: "calculator",
    description: "Spawns Calaculator",
    category: "Information",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "calculator",
    run:async(client, message, args)=>{
        return reply('This command is currently disabled please check top.gg for more info', true, message)
        await Calculator({
            message: message,
            embed: {
                title: 'Calculator',
                color: '#7289da',
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    },
};