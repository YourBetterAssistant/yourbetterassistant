const Discord=require('discord.js')
const { delay } = require('./handlers/functions')
module.exports={
    chatBot,
    memberCount,
    memberLog,
    welcomeMes,
    roles

}
const f=i=>i.user.id===message.author.i&&i.componentType=='BUTTON'
async function chatBot(message, co, state){
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId('y')
        .setLabel('Yes')
        .setStyle('SUCCESS'),
        new Discord.MessageButton()
        .setCustomId('n')
        .setLabel('No')
        .setStyle('DANGER')
    )
    message.channel.send({content:'Enable ChatBot?',components:[row]})
    await message.channel.awaitMessageComponent(f)
    .then(async(click)=>{
        console.log('e')
        if (click.customId === 'y') {
            await click.deferUpdate()
            delay(100)
            await click.editReply({content:'Chatbot Requires A channelId please type a channelId in chat now', components:[]})
            co=true
        }
        if(click.customId==='n'){
            await click.deferReply()
            delay(1000)
            await click.editReply({content:'ChatBot is now disabled', components:[]})
            co=false
        }
    })
    let filter=m=>m.author.id==message.author.id
    delay(1000)
    if(co==true){
    await message.channel.awaitMessages({filter, max:1})
    .then(async(collected)=>{
        collected=collected.first()
        if(collected){
            let c=message.guild.channels.cache.get(collected.content)
            if(!c)return message.channel.send('The provided Id is invalid try again later')
            state.chatBot.channelId=collected.content
        }
        })}
}




async function memberLog(message, co, state){
    let r=new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId('y1')
        .setLabel('Yes')
        .setStyle('SUCCESS'),
        new Discord.MessageButton()
        .setCustomId('n1')
        .setLabel('No')
        .setStyle('DANGER')
    )
    message.channel.send({content:'Do You want member-log do be enabled?', components:[r]})
    await message.channel.awaitMessageComponent(f)
    .then(async(click)=>{
        if(click.customId=='y1'){
            await click.deferReply()
            delay(2000)
            await click.editReply({content:'member-log requires an Id give me a channelId most preferably a vc', components:[]})
            co=true

        }
        if(click.customId=='n1'){
            await click.deferReply()
            await click.editReply({content:'member-log is now disabled', components:[]})
            co=false
        }
    })
    if(co==true){
        await message.channel.awaitMessages({filter, max:1})
        .then(async(collected)=>{
            collected=collected.first()
            if(collected){
                let c=message.guild.channels.cache.get(collected.content)
                if(!c)return message.channel.send('The provided Id is invalid try again later')
                state.memberLog.channelId=collected.content
            }
        })

    }
}




async function memberCount(message, co, state){
    let c=new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId('y2')
        .setLabel('Yes')
        .setStyle('SUCCESS'),
        new Discord.MessageButton()
        .setCustomId('n2')
        .setLabel('No')
        .setStyle('DANGER')
    )
    message.channel.send({content:'Do you want to enable memberCount?', components:[c]})
    await message.channel.awaitMessageComponent(f)
    .then(async(i)=>{
        if(i.customId=='y2'){
            await i.deferUpdate()
            delay(2000)
            await i.editReply({content:'member-count requires an Id give me a channelId most preferably a vc', components:[]})
            co=true

        }
        if(i.customId=='n2'){
            await i.deferReply()
            await i.editReply({content:'member-count is now disabled', components:[]})
            co=false
        }

    })
    if(co==true){
        await message.channel.awaitMessages({filter, max:1})
        .then(async(collected)=>{
            collected=collected.first()
            if(collected){
                let c=message.guild.channels.cache.get(collected.content)
                if(!c)return message.channel.send('The provided Id is invalid try again later')
                state.memberCount.channelId=collected.content
            }
        })

    }
}





async function welcomeMes(message, co, state){
    let e=new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('y3')
            .setLabel('Yes')
            .setStyle('SUCCESS'),
            new Discord.MessageButton()
            .setCustomId('n3')
            .setLabel('No')
            .setStyle('DANGER')
        )
        message.channel.send({content:'Do you want to enable welcome message?', components:[e]})
        await message.channel.awaitMessageComponent(f)
        .then(async(click)=>{
            if(click.customId=='y3'){
                await click.deferUpdate()
                delay(2000)
                await click.editReply({content:'welcome-message requires a message give me a message', components:[]})
                co=true

            }
            if(click.customId=='n3'){
                await click.deferReply()
                await click.editReply({content:'welcome-message is now disabled', components:[]})
                co=false
            }
        })
        if(co==true){
            await message.channel.awaitMessages({filter, max:1})
            .then(async(collected)=>{
                collected=collected.first()
                if(collected){
                    state.welcomeMes.message=collected.content
                }
            })

        }
        let k=new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('DM')
            .setLabel('DM')
            .setStyle('PRIMARY'),
            new Discord.MessageButton()
            .setCustomId('CHANNEL')
            .setLabel('Channel')
            .setStyle('PRIMARY')
        )
        message.channel.send({content:'Would you like to DM the member or send a message in a specified channel', components:[k]})
        await message.channel.awaitMessageComponent(f)
        .then(async(click)=>{
            if(click.customId=='DM'){
                await click.deferUpdate()
                delay(2000)
                await click.editReply({content:'Welcome Message is now Enabled with DMs', components:[]})
                state.welcomeMes.dm=true

            }
            if(click.customId=='CHANNEL'){
                await click.deferReply()
                await click.editReply({content:'We now require a channelId', components:[]})
                co=true
            }

        })
        if(co==true){
            await message.channel.awaitMessages({filter, max:1})
            .then(async(collected)=>{
                collected=collected.first()
                if(collected){
                    let c=message.guild.channels.cache.get(collected.content)
                    if(!c)return message.channel.send('The provided Id is invalid try again later')
                    state.welcomeMes.channelId=collected.content
                }
            })
        }
        message.channel.send('Server Config Completed')
}
async function roles(message, co, state){
    message.channel.send('You are now required to tell me the owner role Id')
    const filter=m=>m.author.id===message.author.id
    let fail;
    await message.channel.awaitMessages(filter)
    .then(async(msg)=>{
        msg=msg.first()
        let r=message.guild.roles.get(msg.content)
        if(!r){
            fail=true
            return message.channel.send('The Id Specified is invalid serverconfig is now abandoned. Please Try Again Later')&& fail
        }
        state.roles.ownerRoleId=msg.content

    })
    if(fail==true)return
    message.channel.send('I now need the admin role id')
    await message.channel.awaitMessages(filter)
    .then(async(msg)=>{
        msg=msg.first()
        let r=message.guild.roles.get(msg.content)
        if(!r){
            fail=true
            return message.channel.send('The Id Specified is invalid serverconfig is now abandoned. Please Try Again Later')&& fail
        }
    })
    if(fail==true)return
    //member
    message.channel.send('I now need the member role id')
    await message.channel.awaitMessages(filter)
    .then(async(msg)=>{
        msg=msg.first()
        let r=message.guild.roles.get(msg.content)
        if(!r){
            fail=true
            return message.channel.send('The Id Specified is invalid serverconfig is now abandoned. Please Try Again Later')&& fail
        }
    })
    if(fail==true)return

}