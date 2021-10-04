'use strict';

const { awaitChatbot, awaitWelcome, awaitmemberCount, awaitMemberLog, awaitRoles, awaitautoMod } = require("../../Constructors/serverconfig")
const {MessageActionRow, MessageSelectMenu}=require('discord.js')
module.exports = {
    name: "serverconfig",
    aliases: ["conf"],
    description: "Set-up the server",
    category: "Administration",
    memberpermissions:["ADMINISTRATOR"],
    cooldown: 10,
    usage: "serverconf",
    run:async(client, message, args)=>{
        const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
        const filter=m=>m.author.id==message.author.id
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
                ]),
        );

        message.reply({ content: 'Choose your setting', components: [row] });
        await message.channel.awaitMessageComponent(f)
        .then(async(choose)=>{
            if(choose.values.toString()=='chatbot'){
                await awaitChatbot(message)
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
