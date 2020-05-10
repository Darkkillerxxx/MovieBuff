import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('buff.db')

export const init=()=>{
    
    const promise=new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('CTREATE TABLE IF NOT EXISTS (UserId TEXT,FbId TEXT,ScreenName TEXT,Password TEXT,DBData TEXT);',[]);
        },
        ()=>{
            resolve()
        },
        (_,err)=>{
            reject(err)
        })
       
    })
    return promise
}