const Discord=require('discord.js')
module.exports = {
    name: "weather",
    description: "Shows the weather of a country",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "weather <country>",
    run:async(client, message, args)=>{
        var weather = require('weather-js')
        if(!args[0])return message.reply('Humph I quit, just tell me the country!')
        let place=args.slice(0).join(" ")
        weather.find({search: place, degreeType: 'C'}, function(err, result) {

            if(err)return message.channel.send(err)
             


               try{
                let embed = new Discord.MessageEmbed()
                .setTitle(`Weather - ${result[0].location.name}`)
                .setColor("RANDOM")
                .setDescription("Temperature units can may be differ some time")
                .addField('Timezone', `${result[0].location.timezone}`)
                .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
                .addField("Sky Text", result[0].current.skytext, true)
                .addField("Humidity", result[0].current.humidity, true)
                .addField("Wind Speed", result[0].current.windspeed, true)//What about image
                .addField("Observation Time", result[0].current.observationtime, true)
                .addField("Wind Display", result[0].current.winddisplay, true)
                .setThumbnail(result[0].current.imageUrl);
                
                message.channel.send(embed)
            }catch (err){
                message.channel.send('error')}
            
 

          });
      
        
        

       
   




    },
};