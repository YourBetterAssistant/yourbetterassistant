'use strict';

module.exports = {
  secondsToHMS:function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
},
  //get a member lol
  getMember: function(message, toFind = "") {
    try{
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //changeging the duration from ms to a date
  duration: function(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (60 * 1000)) % 60).toString();
      const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
      const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
      return `\`${days}Days\`,\`${hrs}Hours\`,\`${min}Minutes\`,\`${sec}Seconds\``;
  },
  //function for awaiting reactions
  promptMessage: async function(message, author, time, validReactions) {
    try{
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //Function to wait some time
  delay: function(delayInms) {
    try{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //randomnumber between 0 and x
  getRandomInt: function(max) {
    try{
      return Math.floor(Math.random() * Math.floor(max));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //random number between y and x
  getRandomNum: function(min, max) {
    try{
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //function for creating a bar
  createBar: function(maxtime, currenttime, size = 25, line = "▬", slider = "🔶") {
    try{
      let bar = currenttime > maxtime ? [line.repeat(size / 2 * 2), (currenttime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (currenttime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (currenttime / maxtime)) + 1), currenttime / maxtime];
      if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      return `**[${bar[0]}]**\n**${new Date(currenttime).toISOString().substr(11, 8)+" / "+(maxtime==0?" ◉ LIVE":new Date(maxtime).toISOString().substr(11, 8))}**`;
    }catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  format: function(millis) {
    try{
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  escapeRegex: function(str) {
    try{
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  arrayMove: function(array, from, to) {
    try{
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  getPrettyDate: function(){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    const time=day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    return time
  },
  numberWithCommas:function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */