"use strict";

import { GuildMemberManager, Message, User } from "discord.js";

export default {
  duration: function (ms: number) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (60 * 1000)) % 60).toString();
    const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
    const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
    return `\`${days}Days\`,\`${hrs}Hours\`,\`${min}Minutes\`,\`${sec}Seconds\``;
  },
  secondsToHMS: function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  },
  //get a member lol
  getMember: function (message: Message, toFind = "") {
    try {
      toFind = toFind.toLowerCase();
      let target = (message.guild?.members as GuildMemberManager).cache.get(
        toFind
      );
      if (!target && message.mentions.members)
        target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild?.members.cache.find((member) => {
          return (
            member.displayName.toLowerCase().includes(toFind) ||
            member.user.tag.toLowerCase().includes(toFind)
          );
        });
      }
      if (!target) target = message.member!;
      return target;
    } catch (e: any) {
      console.log(e.stack);
    }
  },
  //Function to wait some time
  delay: function (delayInms: number) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e: any) {
      console.log(String(e.stack));
    }
  },
  //randomnumber between 0 and x
  escapeRegex: function (str: string) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e: any) {
      console.log(String(e.stack));
    }
  },
  getPrettyDate: function () {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = 0 + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    const time =
      day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
    return time;
  },
  numberWithCommas: function (x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
