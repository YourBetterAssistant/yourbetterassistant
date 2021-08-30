const mail=require('../../Constructors/modmail')
module.exports = {
    name: "modmail",
    description: "Modmail",
    category: "Information",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "modmail",
    run:async(client, message, args)=>{
        mail(client, message, {
            //content: 'Hi', // default: ***Support Team***
            role: 'role id', // support role
            dmToggle: true, // default: true
            //blacklistUser: ['userid'], // blacklisted user id's
            //blacklistGuild: ['guildid'], // server that disabled modmail
            categoryID: 'id', // category id
            //embedColor: 'hex code', // default: #075FFF
            
            //delColor: 'DANGER', // default: DANGER
            //delEmoji: 'emoji id', // default: '❌'
          })
    },
};