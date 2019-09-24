import { Request, Response } from 'express';
import bodyParser = require('body-parser');
//import { axios } from 'axios'
//var axios = require('axios')
const axios = require('axios')

import  inserWalkToPay  from '../models/walk-to-pay.models'
import  {TokenCardCredit}  from '../entity/tokenCardCredit'
import sendEmail from '../utility/sendEmail'

var urlCard='http://sandbox.wompi.co/v1/tokens/cards' // Url card prueba  TOKEN
var urlNequi='http://sandbox.wompi.co/v1/tokens/nequi' // Url Nequi prueba  TOKEN

var urlCreateTransaction='http://sandbox.wompi.co/v1/transactions'  // Url card prueba  Transaccion
var urlGetTransaction='http://sandbox.wompi.co/v1/transactions/'  // Url card prueba  Transaccion
var urlGetBackPSE='http://sandbox.wompi.co/v1/pse/financial_institutions' // Trare bancos


        
var getTokenTest = 'pub_test_7uXzVs56KTCjOP7IYiz3WbkC8lWBEzX0' // Token de prueba 
var getTokenProduction = 'pub_prod_6SqAXiHbJoIQH2e9I85GgxA1Gmd9he20'  // Token de produccion   
        


 
class WalkToPayController{  
 
  public async createTransactionNequi(req: Request, res: Response){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + getTokenTest
    }
    try{          
      let tokenNequi={
        payment_method_type: 'NEQUI',
        phone_number: '3991111111', // Numero de celular
        name: 'jose luis', // Nombre usuario
      }
      console.log(tokenNequi)
      var responseNequiToken = await axios.post(urlNequi, tokenNequi,{
        headers: headers
      })
      console.log(responseNequiToken)
      

    }catch(err){
      console.log("Error",err.response.data.error)
    }  
  }
 
  // Toma la tansaccion  
  public async getBackPSEWompi(req: Request, res: Response){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + getTokenTest
    }
    try{          
      var response = await axios.get(urlGetBackPSE,{
          headers: headers
      })
      res.json(response.data.data)
      console.log("Ok", response.data.data)
    }catch(err){
        console.log("ERROR",err)
    }    
   
  }  
  
  public async getTransaction(req: Request, res: Response){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + getTokenTest
      }
      try{          
        var response = await axios.get(urlGetTransaction+'1703-1568727762-39101',{
            headers: headers
        })
        
        console.log("Ok", response.data.data)
      }catch(err){
          console.log("ERROR",err.response.data.error)
      }
      res.json({ message: 'Error'})
      
   }  
  
  // Create transaccion
  public async createTransactionBack(req: Request, res: Response):Promise<any>{
    console.log('Data',req.body)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + getTokenTest
    }
    try{
      let tokenCard={
        "number": '4242424242424242', // Número de tarjeta (como un string, sin espacios) eje 4242424242424242
        "exp_month": req.body.dataCardCredit.month, // Mes de expiración (como string de 2 dígitos)
        "exp_year": req.body.dataCardCredit.year.toString(), // Año de expiración (como string de 2 dígitos)
        "cvc": req.body.dataCardCredit.cvv, // Código de seguridad (como string de 3 o 4 dígitos)
        "card_holder": req.body.dataCardCredit.name // Nombre del tarjeta habiente (string de mínimo 5 caracteres)          
      }                  
      var responseCardToken = await axios.post(urlCard, tokenCard,{
          headers: headers
      })  
      var cartdata={              
        "payment_method_type": "CARD",
        "payment_method": {
          "type": "CARD",
          "installments": req.body.dataCardCredit.quotas, // Número de cuotas
          "token": responseCardToken.data.data.id // Token de la tarjeta de crédito
        },
        // Otros campos de la transacción a crear...
        
        "amount_in_cents": parseInt(req.body.product.Resultados.precio),
        "currency": "COP",
        "name": req.body.product.Resultados.titulo,
        "customer_email": req.body.dataCardCredit.email,
        "reference": req.body.product.Resultados.id_Producto.toString(),
        "description": req.body.product.Resultados.descripcion,
        
        "image_url": req.body.product.Resultados.imagenes_Producto[0],
        "redirect_url": "https://www.kiero.co/",
        "single_use": false,
        
        "collect_shipping": false                 
        }
        var responseWompi = await axios.post(urlCreateTransaction, cartdata,{
            headers: headers
        })
        var responseEstatusTransactionCard = await axios.get(urlGetTransaction+responseWompi.data.data.id,{  // Estado de transaccion
          headers: headers
        })
        inserWalkToPay.createTransactionCard(responseCardToken.data.data,responseWompi.data.data,cartdata,responseEstatusTransactionCard.data.data.status);         
        console.log("Ok")
        res.json({ message: 'Complete'});

    }catch(err){
        console.log("ERROR",err.response.data.error)
        res.json({ message: 'Error'});
    }
    
  }
}
const walkToPayController = new WalkToPayController;
export default walkToPayController;



/*

Ok {
  id: '1703-1568674629-37774',
  created_at: '2019-09-16T22:57:09.065Z',
  amount_in_cents: 2500000,
  reference: '4546645gf',
  customer_email: 'josemase55@gmail.com',
  currency: 'COP',
  payment_method_type: 'CARD',
  payment_method: {
    type: 'CARD',
    extra: {
      bin: '424242',
      name: 'VISA-4242',
      brand: 'VISA',
      exp_year: '29',
      exp_month: '06',
      last_four: '4242'
    },
    installments: 2
  },
  status: 'PENDING',
  status_message: null,
  shipping_address: null,
  redirect_url: 'https://www.mitienda.co',
  payment_source_id: null,
  payment_link_id: null,
  customer_data: null,
  bill_id: null
}


*/


/*
numberCredit: '1111 1111 1111 1111 ',
  name: '7777 undefined77',
  numberDoc: '2222222222',
  typeDoc: 'NIT',
  month: '02',
  year: 2020,
  cvv: '1233',
  quotas: 2,
  paymentMethod: '1'



*/


/*
 

*/