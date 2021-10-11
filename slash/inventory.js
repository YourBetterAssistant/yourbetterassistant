//@ts-check
const { MessageEmbed } = require("discord.js")
const inventory = require("../Schemas/inventory")
function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}
module.exports = {
    name: "inventory",
    description: "Inventory",
    options:[{name:'list', description:'list your inventory', type:1}],
    run:async(client, interaction)=>{
        const embed=new MessageEmbed()
        if(interaction.options.getSubcommand()==='list'){
            embed.setTitle('Inventory of '+ interaction.user.tag)
            .setColor('ORANGE')
            .setTimestamp(Date.now())
            const extractedItems=[]
            const inv=await inventory.findOne({userId:interaction.user.id})
            // @ts-ignore
            if(!inv)return interaction.reply('Get An Inventory By Running b!bal')
            if(inv.inventory.length < 1)return interaction.reply('There is literally Nothing In Your Inventory!')
            for(const item of inv.inventory){
                const isExist=extractedItems.find(i=>i.name.toLowerCase() ===item.toLowerCase() )
                if(isExist){
                    isExist.count=isExist.count+1
                }else{
                    extractedItems.push({name:item, count:1})
                }
                //typeof isExist==='object'?extractedItems[index]={name:item.toLowerCase(), count:isExist.count++}:extractedItems.push({name:item.toLowerCase(), count:1})
            }
            for(const item of extractedItems){
                embed.addField(item.name+`(${item.count.toString()})`, '\u200b')
            }
            embed.fields.length < 2?embed.addField('Literally Nothing Else', '\u200b'):null
            // console.log(extractedItems)
            interaction.deferReply().then(()=>interaction.editReply({embeds:[embed]}))

        }
    }}