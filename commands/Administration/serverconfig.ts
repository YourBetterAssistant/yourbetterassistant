'use strict';

const { awaitChatbot, awaitWelcome, awaitmemberCount, awaitMemberLog, awaitRoles, awaitautoMod, awaitJoinRoles, awaitLevel, enableUnknownCommand } = require("../../Constructors/serverconfig")
const {MessageActionRow, MessageSelectMenu}=require('discord.js')
module.exports = {
    name: "serverconfig",
    aliases: ["conf"],
    description: "Set-up the server",
    category: "Administration",
    memberpermissions:["ADMINISTRATOR"],
    cooldown: 10,
    usage: "serverconf",
    run:async(client, message)=>{
        const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Chatbot',
                        description: 'Chatbot',
                        value: 'chatbot',
                    },
                    {
                        label: 'membercount',
                        description: 'Member count',
                        value: 'mc',
                    },
                    {
                        label: 'memberlog',
                        description: 'Member Log',
                        value: 'ml',
                    },
                    {
                        label: 'welcomeMessage',
                        description: 'Welcome Message',
                        value: 'wm',
                    },
                    {
                        label: 'roles',
                        description: 'Roles',
                        value: 'roles',
                    },
                    {
                        label: 'AutoMod',
                        description: 'Enables Automatic Moderation including anti-ghost ping, spam-prevention and much more',
                        value: 'automod',
                    },
                    {
                        label:'JoinRoles',
                        description:'The Role Immediatly Given After A User Joins',
                        value:'joinrole'
                    },
                    {
                        label:'Levelling',
                        description:'Enables or Disables Levelling',
                        value:'level'
                    },
                    {
                        label:'UnkownCommands',
                        description:'When a user sends a command not listed a bot sends an error message',
                        value:'unknown'
                    }
                ]),
        );

        message.reply({ content: 'Choose your setting', components: [row] });
        await message.channel.awaitMessageComponent(f)
        .then(async(choose)=>{
            if(choose.values.toString()=='chatbot'){
                await awaitChatbot(message)
                return message.channel.send('Config Done')
            }else if(choose.values.toString()=='unknown'){
                await enableUnknownCommand(message)
                return message.channel.send('Config Done')
            }
            else if(choose.values.toString()=='level'){
                await awaitLevel(message)
                return message.channel.send('Config Done')
            }
            else if(choose.values.toString()=='wm'){
                await awaitWelcome(message)
                return message.channel.send('Config Done')
            }
            else if(choose.values.toString()=='mc'){
                await awaitmemberCount(message)
                return message.channel.send('Config Done')
            }
            else if(choose.values.toString()=='ml'){
                await awaitMemberLog(message)
                return message.channel.send('Config Done') 
            }
            else if(choose.values.toString()=='roles'){
                await awaitRoles(message)
                return message.channel.send('Config Done')
            }
            else if(choose.values.toString()=='automod'){
                return await awaitautoMod(message)
            }
            else if(choose.values.toString()==='joinrole'){
                await awaitJoinRoles(message)
                return message.channel.send('config done')
            }


        }).catch(err=>{
            return console.log(err)
        })
        return 
        //code
        /*
        const req=require('../../serverconfig')
        let collector;
        await req.chatBot(message, co, state)
        delay(100000)
        await req.memberCount(message, co, state)
        delay(100000)
        await req.memberLog(message, co, state)
        delay(10000)
        await req.welcomeMes(message, co, state)
        delay(10000)
        await req.roles(message, co, state)
        message.channel.send('Server Config Completed')
        console.log(cache)*/
}}