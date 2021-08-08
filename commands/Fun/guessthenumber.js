const mongoCurrency=require('discord-mongo-currency-fork')
//const {GuessTheNumber}=require('weky')
module.exports = {
    name: "guessthenumber",
    aliases: ["gtn"],
    description: "guess number",
    category: "Fun",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "guessthenumber",
    run:async(client, message, args)=>{
        return message.lineReply('This command is currently disabled please check top.gg for more info')
        await GuessTheNumber({
            message: message,
            embed: {
                title: 'Guess The Number | Weky Development',
                description: 'You have **{{time}}** to guess the number.',
                color: '#7289da',
                timestamp: true,
            },
            publicGame: true,
            number: 189,
            time: 60000,
            winMessage: {
                publicGame:
                    'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
                    
                privateGame:
                    'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
            },
            loseMessage:
                'Better luck next time! The number which I guessed was **{{number}}**.',
            bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
            smallNumberMessage:
                'No {{author}}! My number is smaller than **{{number}}**.',
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel',
            ongoingMessage:
                "A game is already runnning in <#{{channel}}>. You can't start a new one!",
            returnWinner: true,
        });
        mongoCurrency.giveCoins(message.author.id,message.guild,id, 100)
        message.channel.send('Here is 100YBCs for attempting!')
    },
};