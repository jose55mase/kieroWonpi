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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { axios } from 'axios'
//var axios = require('axios')
const axios = require('axios');
const walk_to_pay_models_1 = __importDefault(require("../models/walk-to-pay.models"));
const sendEmail_1 = __importDefault(require("../utility/sendEmail"));
var urlCard = 'http://sandbox.wompi.co/v1/tokens/cards'; // Url card prueba  TOKEN
var urlNequi = 'http://sandbox.wompi.co/v1/tokens/nequi'; // Url Nequi prueba  TOKEN
var urlCreateTransaction = 'http://sandbox.wompi.co/v1/transactions'; // Url card prueba  Transaccion
var urlGetTransaction = 'http://sandbox.wompi.co/v1/transactions/'; // Url card prueba  Transaccion
var urlGetBackPSE = 'http://sandbox.wompi.co/v1/pse/financial_institutions'; // Traer bancos
var urlCreateTransactionPSE = 'http://sandbox.wompi.co/v1/payment_links'; // Traer bancos
var getTokenTest = 'pub_test_7uXzVs56KTCjOP7IYiz3WbkC8lWBEzX0'; // Token de prueba 
var getTokenProduction = 'pub_prod_6SqAXiHbJoIQH2e9I85GgxA1Gmd9he20'; // Token de produccion   
class WalkToPayController {
    createTransactionPSE(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                let payPSE = {
                    "payment_method_type": "PSE",
                    "payment_method": {
                        "type": "PSE",
                        "user_type": req.body.dataPSE.person_type,
                        "user_legal_id_type": req.body.dataPSE.document_typearg,
                        "user_legal_id": req.body.dataPSE.document_number,
                        "financial_institution_code": req.body.dataPSE.back,
                        "payment_description": req.body.product.Resultados.titulo // Nombre de lo que se está pagando. Máximo 64 caracteres
                    },
                    "amount_in_cents": parseInt(req.body.product.Resultados.precio),
                    "currency": "COP",
                    "name": req.body.product.Resultados.titulo,
                    "customer_email": req.body.dataPSE.email,
                    "reference": "saffsdfsasdfe4545",
                    "description": req.body.product.Resultados.descripcion,
                    "image_url": req.body.product.Resultados.imagenes_Producto[0],
                    "redirect_url": "https://www.kiero.co/",
                    "single_use": false,
                    "collect_shipping": false
                };
                sendEmail_1.default.sendMail(req.body);
                var responseNequi = yield axios.post(urlCreateTransaction, payPSE, { headers: headers });
                var responseEstatusTransactionPSE = yield axios.get(urlGetTransaction + responseNequi.data.data.id, { headers: headers });
                console.log("Compreto");
                res.json({ message: 'Complete' });
            }
            catch (err) {
                console.log("ERROR", err.response.data.error.messages.payment_method);
                res.json({ message: 'Error' });
            }
        });
    }
    // CREAR TRANSACCION POR NEQUI 
    createTransactionNequi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                let tokenNequi = {
                    payment_method_type: 'NEQUI',
                    phone_number: '3991111111',
                    name: 'jose luis',
                };
                console.log(tokenNequi);
                var responseNequiToken = yield axios.post(urlNequi, tokenNequi, {
                    headers: headers
                });
                console.log(responseNequiToken);
            }
            catch (err) {
                console.log("Error", err.response.data.error);
            }
        });
    }
    // Toma la tansaccion  
    getBackPSEWompi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                var response = yield axios.get(urlGetBackPSE, {
                    headers: headers
                });
                res.json(response.data.data);
                console.log("Ok", response.data.data);
            }
            catch (err) {
                console.log("ERROR", err);
            }
        });
    }
    getTransaction(req, res) {
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
            res.json({ message: 'Error' });
        });
    }
    // Create transaccion
    createTransactionBack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Data', req.body);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenTest
            };
            try {
                let tokenCard = {
                    "number": '4242424242424242',
                    "exp_month": req.body.dataCardCredit.month,
                    "exp_year": req.body.dataCardCredit.year.toString(),
                    "cvc": req.body.dataCardCredit.cvv,
                    "card_holder": req.body.dataCardCredit.name // Nombre del tarjeta habiente (string de mínimo 5 caracteres)          
                };
                var responseCardToken = yield axios.post(urlCard, tokenCard, {
                    headers: headers
                });
                var cartdata = {
                    "payment_method_type": "CARD",
                    "payment_method": {
                        "type": "CARD",
                        "installments": req.body.dataCardCredit.quotas,
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
                };
                var responseWompi = yield axios.post(urlCreateTransaction, cartdata, {
                    headers: headers
                });
                var responseEstatusTransactionCard = yield axios.get(urlGetTransaction + responseWompi.data.data.id, {
                    headers: headers
                });
                walk_to_pay_models_1.default.createTransactionCard(responseCardToken.data.data, responseWompi.data.data, cartdata, responseEstatusTransactionCard.data.data.status);
                console.log("Ok");
                res.json({ message: 'Complete' });
            }
            catch (err) {
                console.log("ERROR", err.response.data.error);
                res.json({ message: 'Error' });
            }
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
/*
 

*/ 
