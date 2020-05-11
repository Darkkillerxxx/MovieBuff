const base_url="https://dsbykshku3.execute-api.ap-south-1.amazonaws.com/dev/"
import {ToastAndroid} from 'react-native'
export const BollyWood=[
    {
        id:1,
        Name:"1970-1980",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-1+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-1+2.jpg",
        Checked:false
    },
    {
        id:2,
        Name:"1980-1990",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-2+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-2+2.jpg",
        Checked:false
    },
    {
        id:3,
        Name:"1990-2000",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-3+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-3+2.jpg",
        Checked:false
    },
    {
        id:4,
        Name:"2000-2010",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-4+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-4+2.jpg",
        Checked:false
    },
    {
        id:5,
        Name:"2010-2020",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-5+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-5+2.jpg",
        Checked:false
    }
]


export const HollyWood=[
    {
        id:1,
        Name:"1970-1980",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-1+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-1+2.jpg",
        Checked:false
    },
    {
        id:2,
        Name:"1980-1990",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-2+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-2+2.jpg",
        Checked:false
    },
    {
        id:3,
        Name:"1990-2000",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-3+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-3+2.jpg",
        Checked:false
    },
    {
        id:4,
        Name:"2000-2010",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-4+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-4+2.jpg",
        Checked:false
    },
    {
        id:5,
        Name:"2010-2020",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-5+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-5+2.jpg",
        Checked:false
    }
]


export const Mixed=[
    {
        id:1,
        Name:"1970-1980",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-1+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-1+2.jpg",
        Checked:false
    },
    {
        id:2,
        Name:"1980-1990",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-2+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-2+2.jpg",
        Checked:false
    },
    {
        id:3,
        Name:"1990-2000",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-3+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-3+2.jpg",
        Checked:false
    },
    {
        id:4,
        Name:"2000-2010",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-4+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-4+2.jpg",
        Checked:false
    },
    {
        id:5,
        Name:"2010-2020",
        Url1:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/bollywood+era-5+1.jpg",
        Url2:"https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/hollywood+era-5+2.jpg",
        Checked:false
    }
]

let Endpoints={
    checkAvailable:"/register",
    GetAvatars:"/avatar",
    Register:"/profile",
    GetQuestions:"/getQuestions",
    GetResult:"/result",
    Login:"/login",
    AddCoins:'/earncoins'
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
            console.log(response.status)
           if(response.status === 500)
           {
            ToastAndroid.show("Our Servers Are Facing Some Issues.Please Try Again After Some Time",ToastAndroid.LONG)
            let res={
                IsSuccess:false
            }   
            return res
           }
           else if(response.status === 400)
           {
            ToastAndroid.show("Bad Request",ToastAndroid.LONG)
            let res={
                IsSuccess:false
            }   
            return res
           }
           else if(response.status === 502)
           {
            ToastAndroid.show("Bad GateWay",ToastAndroid.LONG)
            let res={
                IsSuccess:false
            }   
            return res
           }
           else
           {
            return response.json()
           }
              
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

export function getQuestions(payload)
{
    console.log("Payload",payload)
    return makeRequest("POST",payload,null,Endpoints.GetQuestions).then(result=>{
        return result
    })
}


export function getResult(payload)
{
    console.log("Payload",payload)
    return makeRequest("POST",payload,null,Endpoints.GetResult).then(result=>{
        return result
    })
}

export function login(payload)
{
    console.log("Payload",payload)
    return makeRequest("POST",payload,null,Endpoints.Login).then(result=>{
        return result
    })
}

export function AddCoins(payload)
{
    console.log("Payload",payload)
    return makeRequest("POST",payload,null,Endpoints.AddCoins).then(result=>{
        return result
    })
}

