//For PM2
module.exports = {
    apps : [{
      name   : "YBA",
      script : "./index.js",
      exec_mode:"cluster",
      instances:1,
      out_file:'./logs.log',
      error_file:'./err.log'
    }]
  }