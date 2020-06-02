import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('buff.db')

// export const init=()=>{
    
//     const promise=new Promise((resolve,reject)=>{
//         db.transaction((tx)=>{
//             // console.log(tx)
//             tx.executeSql('CREATE TABLE users (DBData TEXT);',[]);
//         },
//         ()=>{
//             resolve()
//         },
//         (_,err)=>{
//             console.log(err)
//             reject(err)
//         })
//     })
//     return promise
// }

export const init = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY NOT NULL, DBData TEXT);',
          [],
          () => {
            resolve();
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };

  export const insertUser = (DbObject) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO Users (DBData) VALUES (?);`,
            [DbObject],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const fetchUser = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM Users;`,
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const UpdateUser = (DBData) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE Users SET DBData = ? WHERE id = 1;`,
            [DBData],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const DeleteUser = () => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM Users WHERE id = 1;`,
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};
