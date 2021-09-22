const {MessageEmbed}=require('discord.js')
module.exports = {
    name: "saveone",
    description: "Save One",
    options:[{name:'user', description:'user', type:6}],
    run:async(client, interaction)=>{
        let user=interaction.options.getUser('user')
        const embed=new MessageEmbed()
        .setTitle('Save One!')
        .setColor('GREEN')
        if(!user){
            let img=interaction.member.user.displayAvatarURL()
            img=img.replace('.webp', '.png')
            embed.setImage(`https://api.weky.xyz/canvas/saveonlyone?image=${img}&image2=https://cdn.discordapp.com/avatars/155149108183695360/19a5ee4114b47195fcecc6646f2380b1.png&image3=https://cdn.discordapp.com/avatars/270904126974590976/d60c6bd5971f06776ba96497117f7f58.png`)
            interaction.reply({embeds:[embed]})
            return
        }else{
            let img=user.displayAvatarURL()
            img=img.replace('.webp', '.png')
            embed.setImage(`https://api.weky.xyz/canvas/saveonlyone?image=${img}&image2=https://cdn.discordapp.com/avatars/155149108183695360/19a5ee4114b47195fcecc6646f2380b1.png&image3=https://cdn.discordapp.com/avatars/270904126974590976/d60c6bd5971f06776ba96497117f7f58.png`)
           interaction.reply({embeds:[embed]})
        }
        
    },
};