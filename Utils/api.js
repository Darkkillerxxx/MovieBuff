const base_url="http://ff1e7d64.ngrok.io"

let Endpoints={
    checkAvailable:"/register",
    GetAvatars:"/avatar"
}


function makeRequest(Type,Payload,Parameters,Endpoint)
{   
    if(Type === "GET")
    {
       return fetch(base_url+Endpoint+Parameters).then(response => response.json()).then(result=> {
           return result
       } )
        
    }
}

export function checkAvailable(ScreenName)
{
    let Parameters="/"+ScreenName

   return makeRequest("GET",null,Parameters,Endpoints.checkAvailable).then(result=>{
       return result
   })
}


export function getAvatarList()
{
    let Parameters="/"

   return makeRequest("GET",null,Parameters,Endpoints.GetAvatars).then(result=>{
       return result
   })
}