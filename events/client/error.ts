"use strict";

//here the event starts
export default (client: any, error: { stack: any }) => {
  return console.log(`An error occured \n\n\n\n\n ${error.stack}`);
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
