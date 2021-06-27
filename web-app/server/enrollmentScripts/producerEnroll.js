/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml')

// capture network variables from config.json
const configPath = path.join(process.cwd(), './config/producer.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var connection_file = config.connection_file;
var appAdmin = config.appAdmin;
var appAdminSecret = config.appAdminSecret;
var userName = config.userName;
var orgMSPID = config.orgMSPID;
var caURL = config.caUrl;

const ccpPath = path.join(process.cwd(), './connectionProfiles/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const connectionFile = JSON.parse(ccpJSON);

async function main() {
    try {
        // Create a new CA client for interacting with the CA.

        const ca = new FabricCAServices(caURL);
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(userName);
        if (adminExists) {
            console.log(`An identity for the admin user ${userName} already exists in the wallet`);
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.

        const enrollment = await ca.enroll({ enrollmentID: appAdmin, enrollmentSecret: appAdminSecret });
        const identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        wallet.import(appAdmin, identity);
        console.log('msg: Successfully enrolled admin user ' + userName + ' and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user: ${userName} ${error}`);
        process.exit(1);
    }
}

main();