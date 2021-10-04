const { MessageEmbed, Collection, Message } = require("discord.js")
// const m=new Message()
// m.mentions.users.sizr
const messageUpdate=async(oldMessage, newMessage)=>{
    if(oldMessage.author.bot)return
    const membermention=[]
    const rolemention=[]
    const usermention=[]
    const everyonemention=false
    let olduserMentioned=false
    let oldroleMentioned=false
    const oldmentionedUsers=[]
    const oldmentionedRoles=[]
    const oldmentionedMembers=[]
    let oldeveryoneMentioned=false
    let oldmemberMentioned=false
    if(oldMessage.mentions.users.size >= 1){olduserMentioned=true}
    if(oldMessage.mentions.roles.size  >= 1){oldroleMentioned=true}
    if(oldMessage.mentions.everyone.size  >= 1){oldeveryoneMentioned=true}
    if(oldMessage.mentions.members.size  >= 1){oldmemberMentioned=true}
    //New Message 
    let newuserMentioned=false
    let newroleMentioned=false
    const newmentionedUsers=[]
    const newmentionedRoles=[]
    const newmentionedMembers=[]
    let neweveryoneMentioned=false
    let newmemberMentioned=false
    if(newMessage.mentions.users.size >= 1){newuserMentioned=true}
    if(newMessage.mentions.roles.size  >= 1){newroleMentioned=true}
    if(newMessage.mentions.everyone.size  >= 1){neweveryoneMentioned=true}
    if(newMessage.mentions.members.size  >= 1){newmemberMentioned=true}
    for(const mention of oldMessage.mentions.users){
        oldmentionedUsers.push(mention)
    }
    for(const mention of oldMessage.mentions.roles){
        oldmentionedRoles.push(mention)
    }

    for(const mention of oldMessage.mentions.members){
        oldmentionedMembers.push(mention)
    }
    for(const mention of newMessage.mentions.users){
        newmentionedUsers.push(mention)
    }
    for(const mention of newMessage.mentions.roles){
        newmentionedRoles.push(mention)
    }

    for(const mention of newMessage.mentions.members){
        newmentionedMembers.push(mention)
    }
    if(oldroleMentioned===false && olduserMentioned===false&& oldmemberMentioned===false && oldeveryoneMentioned===false&&newroleMentioned===false && newuserMentioned===false&& newmemberMentioned===false && neweveryoneMentioned===false ) return
    if(oldroleMentioned===false && olduserMentioned===false&& oldmemberMentioned===false && oldeveryoneMentioned===false&&newroleMentioned===true && newuserMentioned===true&& newmemberMentioned===true && neweveryoneMentioned===true ) return
    for(const mention of oldmentionedMembers){
        if(!newmentionedMembers.includes(mention)){
            membermention.push(mention)
        }
        if(newmentionedMembers[0] !== mention[0]){
            membermention.push(mention)
        }
    }
    for(const mention of oldmentionedUsers){
        if(!newmentionedUsers.includes(mention)){
            usermention.push(mention)
        }
        if(newmentionedUsers[0] !== mention[0]){
            usermention.push(mention)
        }
    }
    for(const mention of oldmentionedRoles){
        if(!newmentionedRoles.includes(mention)){
            rolemention.push(mention)
        }
        if(newmentionedRoles[0] !== mention[0]){
            rolemention.push(mention)
        }
    }
    if(neweveryoneMentioned ==false && oldeveryoneMentioned==true){
        everyonemention=true
    }
    const embed=new MessageEmbed()
    .setTitle('Ghost Ping!')
    let i=1
    for(let mention of membermention){
        mention=mention[1]
        embed.addField('Mentioned-Members '+ i++, `${mention}`, false)
    }
    let i2=1
    for(let mention of rolemention){
        mention=mention[1]
        embed.addField(`Mentioned-Roles ${i2++}`, `${mention}`, false)
    }
    let i3=1
    for(let mention of usermention){
        mention=mention[1]
        embed.addField(`Mentioned-Users ${i3++}`, `${mention}`, false)
    }
    embed.addField('Everyone-Mentioned?', everyonemention.toString(), false)
    embed.setAuthor(`${newMessage.author.tag}`, newMessage.author.displayAvatarURL('png', {dynamic:true}))
    embed.setColor('GREEN')
    .setTimestamp(new Date())
    newMessage.channel.send({embeds:[embed]})

}
const messageDelete=async(message)=>{
    if(oldMessage.author.bot) return
    let userMentioned=false
    let roleMentioned=false
    const mentionedUsers=[]
    const mentionedRoles=[]
    const mentionedMembers=[]
    let everyoneMentioned=false
    let memberMentioned=false
    if(message.mentions.users.size >= 1){userMentioned=true}
    if(message.mentions.roles.size  >= 1){roleMentioned=true}
    if(message.mentions.everyone.size  >= 1){everyoneMentioned=true}
    if(message.mentions.members.size  >= 1){memberMentioned=true}
    for(const mention of message.mentions.users){
        mentionedUsers.push(mention)
    }
    for(const mention of message.mentions.roles){
        mentionedRoles.push(mention)
    }

    for(const mention of message.mentions.members){
        mentionedMembers.push(mention)
    }
    if(roleMentioned===false && userMentioned===false&& memberMentioned===false && everyoneMentioned===false) return
    const embed=new MessageEmbed()
    .setTitle('Ghost Ping!')
    let i=1
    for(let mention of mentionedMembers){
        mention=mention[1]
        embed.addField('Mentioned-Members '+ i++, `${mention}`, false)
    }
    let i2=1
    for(let mention of mentionedRoles){
        mention=mention[1]
        embed.addField(`Mentioned-Roles ${i2++}`, `${mention}`, false)
    }
    let i3=1
    for(let mention of mentionedUsers){
        mention=mention[1]
        embed.addField(`Mentioned-Users ${i3++}`, `${mention}`, false)
    }
    embed.addField('Everyone-Mentioned?', everyoneMentioned.toString(), false)
    embed.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL('png', {dynamic:true}))
    embed.setColor('GREEN')
    .setTimestamp(new Date())
    message.channel.send({embeds:[embed]})
    

}
module.exports={
    messageDelete,
    messageUpdate
}