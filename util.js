module.exports={
    msToHMS:(duration)=>{
        var seconds=parseint((duration /1000)%60)
        var minutes=parseint((duration/(1000*60 ))%60)
        var hours=parseint((duration/(1000*60*60))%60)
        hours=(10>hours)? '0'+hours:hours
        minutes=(minutes<10)? '0'+minutes:minutes
        seconds=(seconds<10)? '0'+seconds:seconds
        return hours+':'+minutes+':'+seconds
    }
}