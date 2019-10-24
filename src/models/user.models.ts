//const pool = require('../database');
import * as sql from 'mssql';
import pool from '../database'

import { promises } from 'fs';
import sendEmail from '../utility/sendEmail';

class UserModel{

  public async selectUsers(res:any):Promise<any>{    
    //EXEC SP_LOGIN_USERS @email='{0}',@password='{1}'
    const listUser = `SELECT * FROM users WHERE password LIKE '${res}'`;
    //const listUser = `EXEC SP_LOGIN_USERS @email='${res.email}',@password='${res.password}'`;
    try{      
      pool.connect().then( async () => {
        const request = new sql.Request(pool);
        const result =  await request.query(listUser);
        console.log(result)
        return result;
      });      
    }catch(err){
      console.log("error");
    }
  }
  public async createUser(res:any):Promise<any>{
    console.log("joasdf: ",res)
    /*
    const user = `INSERT INTO users (name,lastname,nickname,email,password,source_ip,email_status,status,create_at,token_confirmation_email,email_confirmation_sent_on)
    VALUES (
      '${res.name}',
      '${res.lastname}',
      '${res.nickname}',
      '${res.email}',
      '${res.password}',
      
      
      );`; 
    try{      
      pool.connect().then( async () => {
        const request = new sql.Request(pool);
        const result =  await request.query(user);
        console.log(result)
        return result;
      });      
    }catch(err){
      console.log("error");
    }
    */
  }
  
}

const userModel = new UserModel;
export default userModel;
