import { Router } from 'express'
import  path from 'path'
import WalkToPayController from '../controller/walk-to-pay.controller'
 
 
//import {  } from './templates'
 
class WalkToPay{
    router:Router = Router();
 
    constructor(){
         this.config();
    }
    config():void{
         this.router.get('/kk',WalkToPayController.startWompi)
         this.router.get('/',WalkToPayController.createPay)
    }
}
 
export default new WalkToPay().router;
//export default walkToPay_Routes.router;
