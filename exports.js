function reply(content, mention, message){
    message.reply({ content:content, allowedMentions: { repliedUser: mention }})
  }
  exports.reply=reply