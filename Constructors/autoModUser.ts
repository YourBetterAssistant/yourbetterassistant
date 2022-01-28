const AntiSpam = require('discord-anti-spam');
const automod=require('../Schemas/autoMod')
const badwords = require('badwords/array')
function isUpperCase(str) {
    if(str.includes('@')||str.includes('<')||str.includes('>'||str.includes('!')||str.includes('%')||str.includes('#')||str.includes('&')))return false
    if(str.length < 5)return false
    else{
        return str === str.toUpperCase();
    }   
}

class autoMod{
	public message: any;
	public client: any;

    constructor(message){
        this.message=message
        this.client=message.client
    }
    async checkSpam(){
        const message=this.message
        const mode=await automod.findOne({guildId:message.guild.id})
        if(!mode)return
        const antiSpam = new AntiSpam({
            warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
            muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
            kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
            banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
            maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
            warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
            kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
            muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
            banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
            maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
            maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
            maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
            maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
            ignoreBots: true, // Ignore bot messages.
            verbose: true, // Extended Logs from module.
            ignoredMembers: [], // Array of User IDs that get ignored.
            ignoredPermissions: [], // Bypass users with any of these permissions.
            muteRoleName: "muted", // Name of the role that will be given to muted users!
            removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
            // And many more options... See the documentation.
        })
        if(mode.strictMode===false){
            const antiSpam=new AntiSpam({
                warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
                muteThreshold: 6, // Amount of messages sent in a row that will cause a mute
                kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
                banThreshold: 4, // Amount of messages sent in a row that will cause a ban.
                maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
                warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
                kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
                muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
                banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
                maxDuplicatesWarning: 3, // Amount of duplicate messages that trigger a warning.
                maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
                maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
                maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
                ignoredPermissions: [], // Bypass users with any of these permissions.
                ignoreBots: true, // Ignore bot messages.
                verbose: true, // Extended Logs from module.
                ignoredMembers: [], // Array of User IDs that get ignored.
                muteRoleName: "muted", // Name of the role that will be given to muted users!
                removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
                // And many more options... See the documentation.
            })
            antiSpam.message(message)
        }else{
            antiSpam.message(message)
        }
        

    }
    async checkProfanity(){
        const message=this.message
        badwords.forEach(word=>{
            if(message.content.includes(word)){
                const channel=message.channel
                const author=message.author
                message.delete()
                channel.send(`${message.author}, Strict-Mode is Enabled Please Don't Use That Word Again`)
            }
        })
        

    }
    async allCaps(){
        const message=this.message
        if(isUpperCase(message.content)===true){
            return message.channel.send('Stop Spamming Caps!')
        }
    }

}
exports.autoMod=autoMod