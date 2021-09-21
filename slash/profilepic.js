module.exports={
    name:'profilepic',
    description:'Sends photo of profile pic',
    guild:'879927834058043492',
    options:[{name:'user', description:'user', type:6}],
    run:async(client, interaction, Discord)=>{
        let embed=new Discord.MessageEmbed().setColor('RANDOM')
        let user=interaction.options.getUser('user')
        if (!user){
            embed.setImage(interaction.member.user.displayAvatarURL()).setTitle(`${interaction.member.user.username}'s Profile Image`)
            interaction.reply({embeds:[embed]})

        }else{
            embed.setImage(user.displayAvatarURL()).setTitle(`Profile Image`)
            interaction.reply({embeds:[embed]})
        }
    }
}