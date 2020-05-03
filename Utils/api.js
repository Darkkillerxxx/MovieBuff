const base_url="http://a96dd03f.ngrok.io"

let Endpoints={
    checkAvailable:"/register",
    GetAvatars:"/avatar",
    Register:"/profile/"
}


function makeRequest(Type,Payload,Parameters,Endpoint)
{   
    if(Type === "GET")
    {
       return fetch(base_url+Endpoint+Parameters).then(response => response.json()).then(result=> {
           return result
       } )
    }
    else
    {
    console.log(Payload)
      return fetch(base_url+Endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(Payload)
        }).then(response=> {
           return response.json()   
        })
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

export function registerUser(payload)
{
   return makeRequest("POST",payload,null,Endpoints.Register).then(result=>{
       return result
   })
}