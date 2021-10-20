require('dotenv').config()
const axios=require('axios').default
const url=[]
const shell=require('shelljs')
const fs=require('fs')
fs.unlink('err-0.log', err=>console.log(err))
fs.unlink('logs-0.log', err=>console)
url.push(process.env.URL)
async function push(){
    if(process.env.URL){
        await axios.post(url[0], {content:">>> Uptime For YourBetterAssistant"}, {headers:{'Content-Type':'application/json'}})
    }
}
push().then(()=>{
    shell.exec('pm2 start ecosystem.config.js&')
})

process.exit(1)

