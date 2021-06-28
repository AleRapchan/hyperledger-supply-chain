'use strict';

import {connectToNetwork, createProduct, shipProductTo, getProduct, getProductWithHistory} from './fabric/network';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.get('/getProduct/:id', connectToNetwork, (req, res) => {
    const contract = req.contract;
    const productId = req.params.id.toString();
    
    const result = await contract.evaluateTransaction('getProduct', productId);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json({ result: response });
});

app.post('/createProduct', connectToNetwork, (req, res) => {
    const contract = req.contract;
    const product = req.body.product;

    const result = await contract.submitTransaction('createProduct', product);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json( {result: response} );
});

app.get('/getProductWithHistory/:id', connectToNetwork, (req, res) => {
    const contract = req.contract;
    const productId = req.params.id.toString();
    
    const result = await contract.evaluateTransaction('getProductWithHistory', productId);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json({ result: response });
});