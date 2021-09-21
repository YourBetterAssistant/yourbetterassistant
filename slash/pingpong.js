const {SlashCommandBuilder}=require('@discordjs/builders')
const data=new SlashCommandBuilder()
data.setName('ping')
data.setDescription('pong')
module.exports={
    name:'ping',
    description:'pong',
    run:async (client, interaction, Discord, data)=>{
        interaction.reply('Pong!')
    }
}
