require('dotenv').config()
import axios from 'axios'
const url=[]
import shell from 'shelljs'
import fs from 'fs'
url.push(process.env.URL)
async function push(){
    if(process.env.URL){
        await axios.post(url[0], {content:">>> Uptime For YourBetterAssistant"}, {headers:{'Content-Type':'application/json'}})
    }
}
push()
require('./index')
