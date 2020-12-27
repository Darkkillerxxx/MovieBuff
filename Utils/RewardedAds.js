import {
    AdMobRewarded
  } from 'expo-ads-admob';


  export const SetUnitId=()=>{
    //
    return AdMobRewarded.setAdUnitID('ca-app-pub-7546310836693112/3539987979').then(()=>{
        
        return true
    
    })
    .catch(err=>{

        return false

    })

  }

 export const FetchAds=()=>{

    return AdMobRewarded.requestAdAsync().then(()=>{
            
        return true

        }).catch(err=>{
            console.log("Fetch Ads Error",err)
            return false

        })
  }

  export const ShowVideoAd=()=>{
        return AdMobRewarded.showAdAsync().then(()=>{
            // ToastAndroid.show("Ads Successfully Shown",ToastAndroid.Short)
            return true
        }).catch((err)=>{
            console.log("Ad is Not Ready",err)
            return false
        });
  }