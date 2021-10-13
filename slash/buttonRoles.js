const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const rrSchema = require("../Schemas/rrSchema")

module.exports = {
    name: "buttonroles",
    description: "Button Roles",
    options:[{type:7, name:'channel', description:'The Channel For The Message To Be Sent To', channel_types:[0, 5, 6], required:true}, {type:8, name:'role', description:'Role', required:true}, {type:8, name:'role2', description:'2nd Role'}],
    run:async(client, interaction)=>{
        if(!interaction.member.permissions.has('MANAGE_ROLES')){
            return interaction.reply({content:'Misisng Perms: `MANAGE_ROLES`', ephemeral:true})
        }else
        interaction.reply('Making The Message...')
        const channel=interaction.options.getChannel('channel')
        const role1=interaction.options.getRole('role')
        const role2=interaction.options?.getRole('role2')
        const embed= new MessageEmbed()
        .setTitle('Get Your Roles!')
        .addField('First Role Up For Grabs', `${role1} `)
        .setColor('FUCHSIA')
        role2?embed.addField('Second Role up For Grabs', `${role2}`):null
        const row=new MessageActionRow()

        role2?row.addComponents(
            new MessageButton()
            .setLabel(role1.name)
            .setCustomId(role1.name)
            .setStyle('PRIMARY')
            ,new MessageButton()
            .setLabel(role2.name)
            .setCustomId(role2.name)
            .setStyle('PRIMARY')
        ):row.addComponents(
            new MessageButton()
            .setLabel(role1.name)
            .setCustomId(role1.name)
            .setStyle('PRIMARY')
        )
        const message=await channel.send({embeds:[embed], components:[row]})
        role2?await rrSchema.findOneAndUpdate({guildId:interaction.guild.id}, {guildId:interaction.guild.id, role1:{name:role1.name, id:role1.id}, role2:{name:role2.name, id:role2.id}, messageId:message.id}, {upsert:true}):await rrSchema.findOneAndUpdate({guildId:interaction.guild.id}, {guildId:interaction.guild.id,  role1:{name:role1.name, id:role1.id}, role2:null, messageId:message.id}, {upsert:true})


    }}