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
var urlGetTransaction = 'http://sandbox.wompi.co/v1/transactions/'; // Url card prueba  Transaccion
var getTokenTest = 'pub_test_7uXzVs56KTCjOP7IYiz3WbkC8lWBEzX0'; // Token de prueba 
var getTokenProduction = 'pub_prod_6SqAXiHbJoIQH2e9I85GgxA1Gmd9he20'; // Token de produccion   
class WalkToPayController {
    // Toma la tansaccion
    getTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                var response = yield axios.get(urlGetTransaction + '1703-1568727762-39101', {
                    headers: headers
                });
                console.log("Ok", response.data.data);
            }
            catch (err) {
                console.log("ERROR", err.response.data.error);
            }
        });
    }
    // Create transaccion
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Esta es la response: ", req.body);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                let tokenCard = {
                    "number": req.body.numberCreditPay,
                    "exp_month": req.body.month,
                    "exp_year": req.body.year,
                    "cvc": req.body.cvv,
                    "card_holder": req.body.name // Nombre del tarjeta habiente (string de mínimo 5 caracteres)
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
                    "reference": "ggg55sdfs",
                    "description": "Color negro, tamaño, único",
                    "expires_at": "2018-09-20T05:00:00.000Z",
                    "image_url": "https://bit.ly/2MBcBGH",
                    "redirect_url": "https://www.kiero.co/",
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
            res.json({ message: 'New create event' });
        });
    }
}
const walkToPayController = new WalkToPayController;
exports.default = walkToPayController;
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
