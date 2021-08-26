const Discord=require('discord.js')
// npm i images-scraper
var Scraper = require('images-scraper');
const google = new Scraper({
    puppeteer: {
      headless: true,
        //delete the bottom bit if ur not using ARM linux distos like raspian e
      executablePath: '/usr/bin/chromium-browser',
    },safe:true,
  })
module.exports = {
    name: "image",
    description: "displays an image searched from the web",
    category: "Fun",
    memberpermissions:["VIEW_CHANNEL","ATTACH_FILES"],
    cooldown: 10,
    usage: "image <query>",
    run:async(client, message, args)=>{
        const image_query=args.join(' ')
        if(!image_query) return message.channel.send('Bruh what is the argument ')
        message.channel.send('Searching ...')
        const image_results=await google.scrape(image_query, 1)
        console.log(image_results[0].title)
        let embed=new Discord.MessageEmbed()
        .setTitle(image_results[0].title)
        .setURL(image_results[0].url)
        .setImage(image_results[0].url)

        message.channel.send({embeds:[embed]})

    },
};