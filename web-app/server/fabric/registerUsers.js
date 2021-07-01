/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'fabric-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // register users with CA
        await registerIdentity(wallet, adminIdentity, ca, 'manager');
        await registerIdentity(wallet, adminIdentity, ca, 'employee');

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

async function registerIdentity(wallet, adminIdentity, ca, identity) {
    // Check to see if we've already enrolled the user.
    const userIdentity = await wallet.get(identity);
    if (userIdentity) {
        console.log(`An identity for the user "${identity}" already exists in the wallet`);
        return;
    }

    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({
        affiliation: 'org1.department1',
        enrollmentID: identity,
        role: 'client'
    }, adminUser);
    const enrollment = await ca.enroll({
        enrollmentID: identity,
        enrollmentSecret: secret
    });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
    await wallet.put(identity, x509Identity);
    console.log(`Successfully registered and enrolled user "${identity}" and imported it into the wallet`);
}
