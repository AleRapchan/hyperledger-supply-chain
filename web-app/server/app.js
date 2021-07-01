'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const network = require('./fabric/network');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log('GET called');
    res.send('Hello world!');
});

app.get('/getProduct/:id', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.params.id.toString();
        
        const result = await contract.evaluateTransaction('getProduct', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/createProduct', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productJson = JSON.stringify(req.body);

        const result = await contract.submitTransaction('createProduct', productJson);
        res.json( {result: result} );
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/getProductWithHistory/:id', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.params.id.toString();
        
        const result = await contract.evaluateTransaction('getProductWithHistory', productId);
        const response = JSON.parse(result.toString());
        console.log(response);
        res.json({ result: response });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.get('/productExists/:id', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const productId = req.params.id.toString();

        const result = await contract.evaluateTransaction('productExists', productId);
        console.log(result.toString());
        res.json({ exists: result.toString() });
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.post('/shipProduct', network.connectToNetwork, async (req, res) => {
    try{
        const contract = req.contract;
        const shipDetails = req.body.shipDetails;
        shipDetails = JSON.parse(shipDetails);

        //Modal of shipDetails
        // shipDetails = {
        //     productId,
        //     newLocation,
        //     arrivalDate
        // };

        const result = await contract.submitTransaction('shipProductTo', 
            shipDetails.productId.toString(), 
            shipDetails.newLocation.toString(),
            shipDetails.arrivalDate.toString());
        
        console.log(result);
        res.json({ status: 'Transaction submitted.', txId: result.toString()});
    } catch(error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
});

app.listen(3003, () => {
    console.log('Listening on port 3003');
});