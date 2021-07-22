const mongo=require('../botconfig/mongo')
const profileSchema=require('../Schemas/profileSchema')
module.exports.getCoins=async(guildID, userID)=>{
    return await mongo().then(async (mongoose)=>{
        try{
            console.log('Running findOne()')
            const result=await profileSchema.findOne({
                guildID,
                userID
            })
            console.log(result)
            let coins='500'
            let bank='0'
            if(result){
                result.coins
            }else{
                console.log('Inserting a document')
                await new profileSchema({
                    guildID,
                    userID,
                    coins,
                    bank,
                }).save()
                result

            }


        }finally{
            mongoose.connection.close()
        }
    })

}