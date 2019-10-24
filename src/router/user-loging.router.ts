import { Router } from 'express'
import  path from 'path'
import userController from '../controller/user-login.controller'
 
 
//import {  } from './templates'
 
class UserRoutes{
    router:Router = Router();
 
    constructor(){
         this.config();
    }
    config():void{
         this.router.post('/login/getUser',userController.postUser);        
         this.router.post('/register/user',userController.createUser);
    }
}
 
export default new UserRoutes().router;
//export default walkToPay_Routes.router;
