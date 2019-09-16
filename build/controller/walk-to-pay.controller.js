"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { axios } from 'axios'
//var axios = require('axios')
const axios = require('axios');
var urlCard = 'http://sandbox.wompi.co/v1/tokens/cards'; // Url card prueba  TOKEN
var urlCreateTransaction = 'http://sandbox.wompi.co/v1/transactions'; // Url card prueba  Transaccion
var getTokenTest = 'pub_test_7uXzVs56KTCjOP7IYiz3WbkC8lWBEzX0'; // Token de prueba 
var getTokenProduction = 'pub_prod_6SqAXiHbJoIQH2e9I85GgxA1Gmd9he20'; // Token de produccion   
class WalkToPayController {
    startWompi() {
        let template = `
       <!DOCTYPE html>
       <html lang="en">
 
       </html>
       `;
        return template;
    }
    createPay() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                let tokenCard = {
                    "number": "4242424242424242",
                    "exp_month": "06",
                    "exp_year": "29",
                    "cvc": "123",
                    "card_holder": "Pedro Pérez" // Nombre del tarjeta habiente (string de mínimo 5 caracteres)
                };
                var response = yield axios.post(urlCard, tokenCard, {
                    headers: headers
                });
                let Cartdata = {
                    "payment_method_type": "CARD",
                    "payment_method": {
                        "type": "CARD",
                        "installments": 2,
                        "token": response.data.data.id // Token de la tarjeta de crédito
                    },
                    // Otros campos de la transacción a crear...
                    "amount_in_cents": 2500000,
                    "currency": "COP",
                    "name": "Cachucha",
                    "customer_email": "josemase55@gmail.com",
                    "reference": "4546645gf",
                    "description": "Color negro, tamaño, único",
                    "expires_at": "2018-09-20T05:00:00.000Z",
                    "image_url": "https://bit.ly/2MBcBGH",
                    "redirect_url": "https://www.mitienda.co",
                    "single_use": false,
                    "sku": "WBXCH1",
                    "collect_shipping": false
                };
                var response = yield axios.post(urlCreateTransaction, Cartdata, {
                    headers: headers
                });
                console.log("Ok", response.data.data);
            }
            catch (err) {
                console.log("ERROR", err.response.data.error);
            }
        });
    }
}
exports.default = new WalkToPayController();
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
