'use strict';


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const network = require('./fabric/network');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/getProduct/:id', network.connectToNetwork, async (req, res) => {
    const contract = req.contract;
    const productId = req.params.id.toString();
    
    const result = await contract.evaluateTransaction('getProduct', productId);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json({ result: response });
});

app.post('/createProduct', network.connectToNetwork, async (req, res) => {
    const contract = req.contract;
    const product = req.body.product;

    const result = await contract.submitTransaction('createProduct', product);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json( {result: response} );
});

app.get('/getProductWithHistory/:id', network.connectToNetwork, async (req, res) => {
    const contract = req.contract;
    const productId = req.params.id.toString();
    
    const result = await contract.evaluateTransaction('getProductWithHistory', productId);
    const response = JSON.parse(result.toString());
    console.log(response);
    res.json({ result: response });
});

app.listen(3333, () => {
    console.log('Listening on port 3333');
});