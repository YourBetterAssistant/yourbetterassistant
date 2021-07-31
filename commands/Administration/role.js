module.exports = {
    name: "roleadd",
    description: "give roles to users",
    category: "Administartion",
    memberpermissions:"MANAGE_ROLES",
    adminPermOverride: true,
    cooldown: 2,
    usage: "role <user> <roleID>",
    run:async(client, message, args)=>{
        if(!args[1])return message.channel.send('Which role do you expect me to give?')
        if(!args[0])return message.channel.send('Whom are you going to do this too?')
        let user=message.mentions.users.first()
        if(!user)return message.channel.send('The user could not be found')
        let role=args.slice(1).join(" ")
        let rolguild=message.guild.roles.cache.find(r=>r.name===role)
        if(!rolguild) rolguild=message.guild.roles.cache.find(r=>r.id===role)
        let uv=message.guild.members.cache.get(user.id)
        uv.roles.add(rolguild).catch(err=>{
            message.channel.send('An error happened')
            return console.log(err)

        })
        message.channel.send('Roles changed')
    },
};