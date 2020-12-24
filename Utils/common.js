export function ChAns(id,step,SelectedOptions,QID){
 
    if(SelectedOptions === QID)
    {
        if(step === 0)
        {
            return true
        }
     if(QID === 4)
     {
         return true
     }
     else
     {
         return false
     }
    }
    else
    {
         return false
    }
 }

 export function calcTimerValue(Timer,TimeAlotted)
 {
    let TimerValue=Timer/TimeAlotted * 100
    return TimerValue
 }