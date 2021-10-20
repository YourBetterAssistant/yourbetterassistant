require('dotenv').config()
const axios=require('axios').default
const url=[]
const shell=require('shelljs')
const fs=require('fs')
url.push(process.env.URL)
async function push(){
    if(process.env.URL){
        await axios.post(url[0], {content:">>> Uptime For YourBetterAssistant"}, {headers:{'Content-Type':'application/json'}})
    }
}
push()
require('./index')

