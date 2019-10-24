import { Request, Response } from 'express';
import bodyParser = require('body-parser');
import modelUser from '../models/user.models'

//import { axios } from 'axios'
//var axios = require('axios')
//const axios = require('axios')

//import  inserWalkToPay  from '../models/walk-to-pay.models'

//import sendEmail from '../utility/sendEmail'


 
class UserController{
  public async postUser(req: Request, res: Response){
    modelUser.selectUsers(req.body)
    res.json({message:"ok"})
  }
  public createUser(req: Request, res: Response){
    modelUser.createUser(req.body)
    res.json({message:"ok"})
  }
  
}
export default new UserController