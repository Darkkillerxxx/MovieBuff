import {
    AdMobRewarded
  } from 'expo-ads-admob';


  export const SetUnitId=()=>{
    //ca-app-pub-3341671606021251/4823652626
    return AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917').then(()=>{
        
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