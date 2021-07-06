// 'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const IDENTITY = 'manager';
const CHANNEL = 'mychannel';
const CONTRACT = 'basic';

exports.connectToNetwork = async function (req, res, next) {
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'fabric-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'fabric', 'wallet');
    console.log(`Wallet path: ${walletPath}`);
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const identity = await wallet.get(IDENTITY);
    if (!identity) {
        console.log(`An identity for the user "${IDENTITY}" does not exist in the wallet`);
        console.log('Run the registerManager.js script before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: IDENTITY, discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork(CHANNEL);
    const contract = network.getContract(CONTRACT);

    req.contract = contract;
    next();

  } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
  }
};