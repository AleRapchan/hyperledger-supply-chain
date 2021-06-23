# Hyperledger Supply-Chain
Food supply-chain is a network to connect participants across the food supply through a permissioned, permanent and shared record of food system data.

![Logo](https://alexandrebarros.com/global/hyperledger/supply-chain-03.png?alt=hyperledger-supply-chain)


## About the project
Food supply chain is a Hyperledger blockchain based solution which solves the tracking and tracing of food products in the supply chain so that any product can be traced back to its roots. Building a food tracking system is an effective way to solve food safety issues. Blockchain is well suited for building product tracking systems because of the inherent immutability and consistency of stored data maintained by encryption and consent mechanisms. We propose to build a tracking system that will unite all suppliers, including food warehouses, food processors, and grocery stores, into one store. Create business correspondence with this chain to enable reliable food tracking without disrupting your food supply chain. Implementation and testing are carried out to evaluate the performance of the proposed monitor. The result is a customizable suite of solutions that can increase food safety and freshness, unlock supply chain efficiencies, minimize waste, enhance your brand’s reputation, and contribute directly to your bottom line. 

## 🏗️ Pillars of Blockchain

- CONSENSUS - Participants will collectively agree that each transaction is valid and the order of the transaction in relation to others. (ex: 2 of 6 or 3 of 6)
- PROVENANCE - Participants know the history of the asset, for example, how its ownership has changed over time, the lifecycle, the history of the asset.
- IMMUTABILITY - No participant can tamper with a transaction once it's agreed.
- FINALITY - Once a transaction is committed, it cannot be reversed, in other words, the data cannot be rolled back to the previous state. If a transaction was in error then a NEW transaction must be used to reverse the error, with both transactions visible.

## About Hyperledger
Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration including leaders in banking, finance, Internet of Things, manufacturing, supply chain, and technology. The Linux Foundation hosts Hyperledger under the foundation. To learn more, visit https://www.hyperledger.org/

## Hyperledger Fabric (HLF) Components
![Logo](https://alexandrebarros.com/global/hyperledger/HLF-Components.png?alt=hyperledger-Components)


## Objective
Bring transparency to the food supply chain with Hyperledger Fabric.

## State Machine
![Logo](https://alexandrebarros.com/global/hyperledger/StateMachine.png?alt=hyperledger-state-machine)

## Physical Asset in the Network
- Food (Apples, etc)
    
## Possible attributes associated with the Asset
- Cost
- Manufacture
- PackageSize 
- Barcode
- Name
- PlaceOfOrigin
- ProduceDate
- ExpirationDate
- Quanitity
- Type

## Possible Smart Contracts for the Asset
Issue
Creates a new drug instance
Inputs: 
- DrugName
- Cost
- Owner
- Manufacture
- PackageSize
- FabricationDate
- ExpirationDate
- Diseases
Outputs: None
Design: Once created, the new asset’s details are stored in the world state

Buy
Transfers ownership of a drug instance
Inputs: 
- issuer, 
- ID, 
- current owner, 
- new owner, 
- price, 
- issue date/time, 
- face value
Outputs: None
Design:
The seller’s cash balance is incremented by the price 
The buyer’s cash balance is decremented by the price 
The buyer becomes the owner of the drug 
Update the drug instance in the world state

Redeem
Transfers cash matching the redemption value to the current owner
Inputs: 
- issuer, 
- ID, 
- current owner, 
- redemption date/time Outputs: None
Design:
The paper must not have already been redeemed
The issuer’s cash balance is decremented by the redemption value The owner’s cash balance is incremented by the redemption value The paper is marked as redeemed
Update the commercial paper instance in the world state

## Instance Description for the Asset
```JSON
{
"product": {
	"originalProductIds": [],
	"id": "123",
	"barcode": "1321312411",
	"name": "Potatoes",
	"placeOfOrigin": "Spain, Toledo",
	"produceDate": "2021-04-23T18:25:43.511Z",
	"expirationDate": "2022-04-23T18:25:43.511Z",
	"quanitity": "5",
	"type": "kg",
	"batchInfo": {
		"quantity": "1000",
	    "size": "",
	    "weight": "",
	},
	"price": "1100.25",
	"category": "Vegetables",
	"variety": "Yellow",
	"misc": {},
	"rating": "5",
	"tracking": {
		"source": {
			"sourceId": 1,
			"source": "The Farm, address",
			"sourceAddress": "Main St.",				
		},
		"destination": {
			"destinationId": 5,
			"destination": "Manufacturing Plant",
			"destinationAddress": "Bay St.",
		},
		"shipmentDate": "",
		"arrivalDate": "",
		"expectedDeliveryDate": "",
		"status": "Picked"
	}
}
```

## Model definition for the asset
```JS
 const productModal = {
	originalProductIds: [],
	id: Number,
	barcode: String,
	name: String,
	placeOfOrigin": String,
	produceDate: Date,
	expirationDate: Date,
	quanitity: Number,
	type: String,
	batchInfo: {
		quantity: Number,
	    	size: Number,
	    	weight: Number
	},
	price: Number,
	category: String,
	variety: String,
	misc: {},
	rating: Number,
	tracking: {
		source: {
			sourceId: Number,
			source: String,
			sourceAddress: String,				
		},
		destination: {
			destinationId: Number,
			destination: String,
			destinationAddress: String,
		},
		shipmentDate: Date,
		arrivalDate: Date,
		expectedDeliveryDate: Date,
		status: String
	}
};
```

## Architecture flow
1. The blockchain operator creates a Docker Kubernetes Service.
2. Users creates a Hyperledger Fabric network on a Docker Kubernetes Service, and the operator installs and instantiates the smart contract on the network.
3. The Node.js application server uses the Fabric SDK to interact with the deployed network on the local or cloud platform where Hyperledger is.
4. The React UI uses the Node.js application API to interact and submit transactions to the network.
5. The user interacts with the supply chain application web interface to update and query the blockchain ledger and state.

## Featured technologies
- Nodejs(https://www.nodejs.org/) is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side.
- ReactJS is a progressive framework for building user interfaces.
- Bootstrap is a free and open-source front-end Web framework. It contains HTML and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.
- Docker(https://www.docker.com/) is a computer program that performs operating-system-level virtualization, also known as Containerization.

## Prerequisites
The following prerequisites are required to run a Docker-based Fabric test network on your local machine.

```Bash
#Update your Linux system
$ apt-get update
$ apt-get upgrade

#Install the latest version of git if it is not already installed.
$ sudo apt-get install git

#Install the latest version of cURL if it is not already installed.
$ sudo apt-get install curl

#Install the latest version of Docker if it is not already installed.
$ sudo apt-get -y install docker-compose

#Make sure the Docker daemon is running.
$ sudo systemctl start docker

#Optional: If you want the Docker daemon to start when the system starts, use the following:
$ sudo systemctl enable docker

#Add your user to the Docker group.
$ sudo usermod -a -G docker <username>

# Optional: Install the latest version of jq if it is not already installed (only required for the tutorials related to channel configuration transactions).
sudo apt-get install jq

# Install Node JS
$ sudo apt-get install nodejs
$ npm

```
### Setting up Docker
```bash
$ sudo groupadd docker
$ sudo usermod -aG docker alexandrebarros $USER
$ newgrp docker
$ docker run hello-world
$ docker ps
$ docker ps -a
$ docker images
$ docker logs --tail 20 [processIdNumber]
$ docker restart

# Reboot if still got error
$ reboot
```

### Install Fabric SDK for NodeJS
The Hyperledger Fabric SDK allows applications to interact with a Fabric blockchain network. It provides a simple API to submit transactions to a ledger or query the contents of a ledger with minimal code.

The client API is published to the npm registry in the fabric-network package.
```bash
npm install fabric-network
```

### Install Docker Images, Fabric Tools and Fabric Samples
Clone from Github Hyperledger Fabric Samples.
1. Run Docker on your machine
2. Create project folder and cd into it
```bash
mkdir new-network
cd new-network
```
3. Run script:
```bash
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9

# sudo curl -sSL https://goo.gl/6wtTN5 | sudo bash -s 1.1.0
# curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s 1.1.0
# sudo chmod 777 -R fabric-samples
```
Now you'll have:
- Fabric-samples downloaded
- Binary tools installed in /bin
- Docker Images downloaded


### Using the Fabric test network
```bash
cd /fabric-samples/test-network/
./network.sh down
./network.sh up -s couchdb -ca -verbose
```

Interact with the network
```bash
cd /fabric-samples/fabcar
~/fabric-samples/fabcar$ ./startFabric.sh javascript
```

### 🐧 Create Linux VM and connect GUI remotly
```bash
sudo apt-get install ubuntu-desktop
sudo adduser demo
sudo usermod -aG sudo,adm demo
sudo -i
#find passwordauthentication "no" change to "yes"
vim /etc/ssh/sshd_config
sudo apt update
sudo apt -y install wget
hostnamectl
wget https://download.nomachine.com/download/7.1/Linux/nomachine_7.1.3_1_amd64.deb
sudo dpkg -i nomachine_7.1.3_1_amd64.deb
sudo reboot
```

### Install IBM Blockchain Platform VS Code extension
 The IBM Blockchain Platform Developer Tools can be installed as a VS Code extension on your local system to make easier your development:
- [Microsoft Visual Studio Code](https://code.visualstudio.com/)
- [IBM Blockchain plugin](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)

## Apache CouchDB and Futon Web GUI
After having seen CouchDB’s raw API, let’s work with Futon, the built-in administration interface. Futon provides full access to all of CouchDB’s features and makes it easy to work with some of the more complex ideas involved. With [Futon](https://docs.couchdb.org/en/1.6.1/intro/futon.html) we can create and destroy databases; view and edit documents; compose and run MapReduce views; and trigger replication between databases.

To load Futon in your browser, visit: 
```bash
http://[your-ip-address/]/utils/
```
Remember to create a firewall rule in your cloud platform before that.
These are the default user and password. Change it in your first access:
- Username: admin
- Password: adminpw

### More info:
- [Docker](https://www.docker.com/products) - latest
- [Docker Compose](https://docs.docker.com/compose/overview/) - latest
- [NPM](https://www.npmjs.com/get-npm) - latest
- [nvm](https://github.com/AleRapchan/private-data-collections-on-fabric/blob/master) - latest
- [Node.js](https://nodejs.org/en/download/) - Node v8.9.x
- [Git client](https://git-scm.com/downloads) - latest
- [HyperLedger Read the Docs](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)
- [HyperLedger Test Network](https://hyperledger-fabric.readthedocs.io/en/release-2.2/test_network.html)

You could use your local docker containers or create a cloud account in IBM Cloud, Azure, AWS or Google Cloud Platform.

## Cloud Environment Setup
### Create key par in Mac
```bash
ssh-keygen -t rsa
cat /home/username/.ssh/id rsa.pub
```

- Create an instance in Google Cloud Platform
- Install Pony SSH plugin in VSC 



## Authors

Name  | Git Hub | LinkedIn
------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) |
Alexei Pancratov |  [@AlexeiPancratov](https://github.com/alexeipancratov) |  Linkedin link |
Michael Francis Jerome Victor | [@Mike-64](https://github.com/Mike-64)| Linkedin link |
Dhruvam Patel | [@DhruvamPatel](https://github.com/dhruvampatel)| Linkedin link |


## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.

## Appendix
- Hyperledger Org: https://www.hyperledger.org/
- Hyperledger Intro: https://hyperledger-fabric.readthedocs.io/en/latest/whatis.html
- Hyperledger GitHub: https://github.com/hyperledger/fabric
- Hyperledger Wiki: https://wiki.hyperledger.org/display/fabric
- What is Private Data: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private-data/private-data.html
- Using Private Data in Fabric: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private_data_tutorial.html

## Interesting Links
- [IBM Food Trust](https://www.ibm.com/blockchain/solutions/food-trust)
- [Fair Trade International](https://www.fairtrade.net/)


