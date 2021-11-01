// eslint-disable-next-line no-unused-vars
const reddit=require('better-redddit')
const ch=[]
module.exports = async function deadChat(client,){
    ch.length=0
    try{
        for(let guild of client.guilds.cache){
            guild=guild[1]
            for(const channels of (guild.channels.cache).filter(c=>c.type =='GUILD_TEXT'&&c.name !='member-log')){
                ch.push({id:guild.id, channels})         
            }
           const channel=ch.filter(c=>c.id===guild.id)[Math.floor(Math.random()*ch.length)].channels[1]
           if(channel){
            let lastMessage=(await channel.messages.fetch({limit: 1})).first()
                //1,200,000
                if(lastMessage){
                    const timestamp=Date.now()-lastMessage.createdTimestamp
                    if(timestamp > 0){
                        if(timestamp >= 10800000){
                            if(lastMessage.channel){
                                const post=(await reddit.top_posts("wholesome", 10))[Math.floor(Math.random() * 10)].data
                                channel.send('Hey People Wake Up!, feel bored? Here is something wholesome from reddit '+ post.url)
                
                            
                            }
                        }
            
                    }
    
                }}
    }
    }catch(err){
        console.log(err)
    }


}