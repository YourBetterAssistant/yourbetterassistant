"use strict";
let cache=new Map()
const { delay } = require('../handlers/functions')
const {MessageActionRow, MessageSelectMenu, MessageButton, Message}=require('discord.js')
const chatbot = require('../Schemas/chatbot')
const countSchema = require('../Schemas/countSchema')
const logSchema=require('../Schemas/logSchema')
const welcomeSchema = require('../Schemas/welcomeSchema')
const serverConfSchema = require('../Schemas/serverConfSchema');
const autoMod = require('../Schemas/autoMod');
const awaitWelcome=async(message)=>{
    const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
    const filter=m=>m.author.id==message.author.id
    let channels=[{label:'Disabled', description:'Use this to be disabled', value:'null'}, {label:'DM', description:'use this so that I will dm the user when they join', value:'DM'}]
                message.guild.channels.cache.forEach(channel=>{
                    if(channel.type==='GUILD_TEXT'){
                        channels.push({
                            label:channel.name,
                            description:channel.id.toString(),
                            value:channel.id
                        })
                    }
                })
                const Enablerow = new MessageActionRow()
                console.log(channels)
                Enablerow
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('channels')
                    .setPlaceholder('none')
                    .addOptions(channels)
                )
                message.reply({content:'Welcome Message', components: [Enablerow], ephemeral:false})
                await message.channel.awaitMessageComponent(f)
                .then(async(click)=>{
                    if(click.values.toString()=='null'){
                        click.deferReply()
                        await welcomeSchema.deleteOne({_id:message.guild.id})
                        click.reply('Disabled Welcome Message')
                        return
                    } 
                    else if(click.values.toString()=='DM'){
                        click.deferReply()
                        click.followUp(`Tell me the message quick!`)
                        console.log('Waiting')
                        await click.channel.awaitMessages({filter, max:1})
                        .then(async(msg)=>{
                            console.log('collected')
                            msg=msg.first()
                            await welcomeSchema.findOneAndUpdate({_id:message.guild.id},{_id:message.guild.id, channelID:null, DM:'true', text:msg.content}, {upsert:true})
                        })
                        click.followUp({content:'I suggest doing that command again but with the other sub-commands like member-log,etc as you may be missing out on a lot', ephemeral:true})
                        return
                    }else{
                        click.deferReply()
                        click.followUp(`Tell me the message quick!`)
                        await message.channel.awaitMessages({filter, max:1})
                        .then(async(msg)=>{
                            msg=msg.first()
                            await welcomeSchema.findOneAndUpdate({_id:message.guild.id},{_id:message.guild.id, channelID:click.values.toString(), DM:'false', text:msg.content}, {upsert:true})
                        })
                        click.followUp({content:'I suggest doing that command again but with the other sub-commands like member-log,etc as you may be missing out on a lot', ephemeral:true})
                        return 
                    }
                }).catch(err=>{console.log(err);return})
                
}
const awaitChatbot=async(message)=>{
    const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
    const filter=m=>m.author.id==message.author.id
    let channels=[{label:'Disabled', description:'Use this to be disabled', value:'null'}]
                message.guild.channels.cache.forEach(channel=>{
                    if(channel.type==='GUILD_TEXT'){
                        channels.push({
                            label:channel.name,
                            description:channel.id.toString(),
                            value:channel.id
                        })
                    }
                })
                const Enablerow = new MessageActionRow()
                console.log(channels)
                Enablerow
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('channels')
                    .setPlaceholder('null')
                    .addOptions(channels)
                )
                message.reply({content:'Chatbot', components: [Enablerow], ephemeral:false})
                await message.channel.awaitMessageComponent(f)
                .then(async(click)=>{
                    if(click.values.toString()=='null'){
                        click.deferReply()
                        await chatbot.deleteOne({guildID:message.guild.id})
                        click.reply('Disabled Chatbot')
                        return
                    } 
                    else{
                        click.deferReply()
                        await chatbot.findOneAndUpdate({guildID:message.guild.id},{guildID:message.guild.id, channelID:click.values.toString()}, {upsert:true})
                        click.followUp(`Added chatbot to <#${click.values.toString()}>`)
                        click.deferUpdate()
                        click.followUp({content:'I suggest doing that command again but with the other sub-commands like member-log,etc as you may be missing out on a lot', ephemeral:true})
                        return
                    }
                })
                
}

async function awaitMemberLog(message){
    const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
    const filter=m=>m.author.id==message.author.id
    let channels=[{label:'Disabled', description:'Use this to be disabled', value:'null'}]
                message.guild.channels.cache.forEach(channel=>{
                    if(channel.type==='GUILD_TEXT'){
                        channels.push({
                            label:channel.name,
                            description:channel.id.toString(),
                            value:channel.id
                        })
                    }
                })
                const Enablerow = new MessageActionRow()
                console.log(channels)
                Enablerow
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('channels')
                    .setPlaceholder('null')
                    .addOptions(channels)
                )
                message.reply({content:'Member Log', components: [Enablerow], ephemeral:false})
                await message.channel.awaitMessageComponent(f)
                .then(async(click)=>{
                    if(click.values.toString()=='null'){
                        click.deferReply()
                        await logSchema.deleteOne({_id:message.guild.id})
                        click.reply('Disabled MemberLog')
                        return
                    } 
                    else{
                        click.deferReply()
                        await logSchema.findOneAndUpdate({_id:message.guild.id},{_id:message.guild.id, channelID:click.values.toString()}, {upsert:true})
                        click.followUp(`Added Memberlog to <#${click.values.toString()}>`)
                        click.deferUpdate()
                        click.followUp({content:'I suggest doing that command again but with the other sub-commands like member-log,etc as you may be missing out on a lot', ephemeral:true})
                        return
                    }
                })

}
async function awaitmemberCount(message){
    const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
    const filter=m=>m.author.id==message.author.id
    let channels=[{label:'Disabled', description:'Use this to be disabled', value:'null'}]
                message.guild.channels.cache.forEach(channel=>{
                    if(channel.type==='GUILD_VOICE'){
                        channels.push({
                            label:channel.name,
                            description:channel.id.toString(),
                            value:channel.id
                        })
                    }
                })
                const Enablerow = new MessageActionRow()
                console.log(channels)
                Enablerow
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('channels')
                    .setPlaceholder('null')
                    .addOptions(channels)
                )
                message.reply({content:'Member-Count', components: [Enablerow], ephemeral:false})
                await message.channel.awaitMessageComponent(f)
                .then(async(click)=>{
                    if(click.values.toString()=='null'){
                        click.deferReply()
                        await countSchema.deleteOne({_id:message.guild.id})
                        click.reply('Disabled membercount')
                        return
                    } 
                    else{
                        click.deferReply()
                        await countSchema.findOneAndUpdate({_id:message.guild.id},{_id:message.guild.id, voiceChannelID:click.values.toString()}, {upsert:true})
                        click.followUp(`Added membercount to <#${click.values.toString()}>`)
                        click.deferUpdate()
                        click.followUp({content:'I suggest doing that command again but with the other sub-commands like member-log,etc as you may be missing out on a lot', ephemeral:true})
                        return
                    }
                })
}
async function awaitRoles(message){
    const f=i=>i.user.id===message.author.id&&i.componentType=='SELECT_MENU'
    const filter=m=>m.author.id==message.author.id
    let roles=[]
    let i=1
    message.guild.roles.cache.forEach(r=>{
        i++
        if(i>25)return
        roles.push({label:r.name, description:r.id.toString(), value:r.id.toString()})
    })
    const OwnerRoleId = new MessageActionRow()
    const Enablerow=new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('roles')
        .setPlaceholder('null')
        .addOptions(roles)
    )
    message.reply({content:'Owner! message Owner Role', components: [Enablerow]})
    let fullRoles=[]
    await message.channel.awaitMessageComponent(f)
    .then(async(click)=>{
            click.deferReply()
            fullRoles.push({owner:click.values.toString(), admin:null, member:null})
            click.followUp(`Added <@&${click.values.toString()}> as a Owner Role`)
    })
    message.reply({content:'Admin! message Admin Role', components: [Enablerow]})
    await message.channel.awaitMessageComponent(f)
    .then(async(click)=>{
            click.deferReply()
            fullRoles[0].admin=click.values.toString()
            click.followUp(`Added <@&${click.values.toString()}> as a Admin Role`)
    })
    message.reply({content:'Member! message Member Role', components: [Enablerow]})
    await message.channel.awaitMessageComponent(f)
    .then(async(click)=>{
            click.deferReply()
            fullRoles[0].member=click.values.toString()
            click.followUp(`Added <@&${click.values.toString()}> as a Member Role`)
    })
    console.log()
    await serverConfSchema.findOneAndUpdate({_id:message.guild.id}, {
        _id:message.guild.id,
        adminroleID:fullRoles[0].admin,
        memberroleID:fullRoles[0].member,
        ownerroleID:fullRoles[0].owner,
    }, {upsert:true})
}
async function allow(message, strict){
    await autoMod
    .findOneAndUpdate({guildId:message.guild.id}, {
        guildId:message.guild.id,
        strictMode:strict
    }, {upsert:true})
}
async function disallow(message){
    await autoMod
    .deleteOne({guildId:message.guild.id})
}
async function awaitautoMod(message){
    const f=i=>i.user.id===message.author.id
    const EnableRow=new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('allow')
        .setLabel('Enable')
        .setStyle('SUCCESS')
        ,new MessageButton()
        .setLabel('Disabled')
        .setCustomId('disallow')
        .setStyle('DANGER')
    )
    message.channel.send({content:'Allow Or Disable AutoMod?', components:[EnableRow]})
    await message.channel.awaitMessageComponent(f)
    .then(async(clicked)=>{
        if(clicked.customId=='allow'){
            const EnableRow=new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('strict')
                .setLabel('Strict-Mode')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('non-strict')
                .setLabel('Non-Strict')
                .setStyle('DANGER')
            )
            message.channel.send({content:'Use Strict?', components:[EnableRow]})
            await message.channel.awaitMessageComponent(f)
            .then(async(click)=>{
                return await click.customId==='strict'?allow(message, true):allow(message, false)
            }).catch(err=>console.error(drr))
        }else disallow(message)
        return clicked.reply('Done')
    }).catch((err)=>console.log(err))
}
module.exports={
    awaitWelcome,
    awaitChatbot,
    awaitMemberLog,
    awaitmemberCount,
    awaitRoles,
    awaitautoMod
}