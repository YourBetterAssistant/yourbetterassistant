const { MessageEmbed } = require("discord.js");
const economy = require("../Constructors/economy");
const inventory = require("../Schemas/inventory")
const store = require("../Schemas/store")
const eco=new economy()
//@ts-check
function replicate(arr, times) {
    var al = arr.length,
        rl = al*times,
        res = new Array(rl);
    for (var i=0; i<rl; i++)
        res[i] = arr[i % al];
    return res;
}
module.exports = {
    name: "store",
    description: "Store",
    options:[{name:'list', description:'list the store', type:1}, {name:'buy', description:'Buy an item', type:1, options:[{name:'item', description:'item', type:3, required:true}, {name:'amount', description:'How much(default=1)', type:10}]}, {name:'add', description:'Developer Only!', type:1, options:[{name:'item', description:'Item Name', type:3, required:true}, {name:'price', description:'Price', type:10, required:true}, {name:'description', description:"Description", type:3, required:true}]}],
    run:async(client, interaction)=>{
        if(interaction.options.getSubcommand()==='list'){
            const embed=new MessageEmbed()
            .setTitle('Shop Items!!!')
            .setFooter('Requested By: '+interaction.user.tag)
            .setTimestamp(new Date())
            .setColor('DARK_GOLD')
            const items=await store.findOne({id:'1'})
            if(!items){
                return interaction.reply('The Store Is Currently Empty')
            }else{
                for(const item of items.items){
                    embed.addField(`${item.name}`, `${item.description}- [${item.price.toString()}](https://yourbetterassistant.me)YBCs`, true)
                }
                interaction.reply({embeds:[embed]})
            }
        }
        else if(interaction.options.getSubcommand()==='add'&&interaction.user.id==='827388013062389761'){
            const itemInfo=[]
            const name=interaction.options.getString('item')
            const price=interaction.options.getNumber('price')
            const description=interaction.options.getString('description')
            itemInfo.push({name, price:price.toString(), description})
            const items=await store.findOne({id:'1'})
            console.log(items)
            if(!items){
                await store.findOneAndUpdate({id:'1'}, {id:'1', items:[itemInfo[0]]}, {upsert:true})
            }else{
                itemInfo.push(...items.items)
                await store.findOneAndUpdate({id:'1'}, {id:'1', items:itemInfo}, {upsert:true})
            }
            itemInfo.length=0
            return interaction.reply(`Added Item \`${name}\`, with price \`${price}YBCs\` with a description of \`${description}\``)
        }
        else if(interaction.options.getSubcommand()==='add'&&interaction.user.id!=='827388013062389761')return interaction.reply({content:'You Are Not Whitelisted to do this', ephemeral:true})
        else if(interaction.options.getSubcommand()==='buy'){
            let realItem=false
            const validItem=[]
            validItem.length=0
            let price=[]
            const useritem=interaction.options.getString('item')
            var amount=interaction.options.getNumber('amount')||1
            const embed=new MessageEmbed()
            .setTitle('Purchase')
            .setColor('BLUE')
            const s=await store.findOne({id:'1'})
            const preinv=await inventory.findOne({userId:interaction.user.id})
            
            for(const item of s.items){
                if(item.name.toLowerCase()!==useritem.toLowerCase()){
                    realItem=false}
                else {
                    price.push(s.items.find(i=>i.name.toLowerCase()===useritem.toLowerCase()).price)
                    realItem=true
                    validItem.push(item.name)
                    console.log(amount)
                    validItem.push(...replicate(validItem, amount-1))
                    console.log(validItem.length)
                }
                continue
            }
            console.log(price[0])
            const sucess=await eco.deductCoins(interaction.user.id, price[0]*amount)
            if(sucess===false)return interaction.reply('Insufficent Funds')
            else 
            if(realItem===false){
                embed
                .setDescription(`The Item \`${useritem}\` is not a valid item in the store lol`)
            }
            else if(amount > 100){
                return interaction.reply('You Cannot Get More Than 100 of any item at once')
            }
            else if(!preinv){
                return interaction.reply("You don't have a bank account ot any money get a job! Or do b!bal to get an account")
            }
            else{
                embed
                .setDescription(`You have Bought \`${amount}\` \`${amount==1?useritem:useritem+'s'}\``)
            }
            await interaction.reply({embeds:[embed]})
            preinv?await inventory.findOneAndUpdate({userId:interaction.user.id}, {userId:interaction.user.id, inventory:[...preinv.inventory,...validItem]}, {upsert:true}):await inventory.findOneAndUpdate({userId:interaction.user.id}, {userId:interaction.user.id, inventory:[...validItem]}, {upsert:true})
    }
        
    }}