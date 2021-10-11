var https = require("https");
module.exports = {
    name: "webserverstatus",
    description: "Shows Status of https://yourbetterassistant.me",
    run:async(client, interaction)=>{
        try{
            https.get({host: "yourbetterassistant.me"}, function(res){
                if( res.statusCode === 200 )
                    return interaction.reply('The Webserver Returned A 200 OK!')
                else
                        interaction.reply('The Webserver Returned a '+res.statusCode+' '+res.statusMessage)
                        interaction.followUp("I don't think that is good I will send a bug report on behalf of you")
                        return client.channels.cache.get('897048482366521436').send(`<@!827388013062389761> https://yourbetterassistant.me returned a ${res.statusCode} ${res.statusMessage}`)
                });
        }catch(err){
            interaction.reply('An Error Occured While Pinging The Webserver A bug report will be sent')
            return client.channels.cache.get('897048482366521436').send(`<@!827388013062389761> https://yourbetterassistant.me returned an unknown error this error occured while running \`webserverstatus.js\``)

        }

    }}