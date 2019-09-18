import { Router } from 'express'
import  path from 'path'
import walkToPayController from '../controller/walk-to-pay.controller'
 
 
//import {  } from './templates'
 
class WalkToPay{
    router:Router = Router();
 
    constructor(){
         this.config();
    }
    config():void{
         this.router.get('/getTransaction',walkToPayController.getTransaction)
         this.router.post('/createTransaction',walkToPayController.createTransaction)
    }
}
 
export default new WalkToPay().router;
//export default walkToPay_Routes.router;
