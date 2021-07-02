# Hyperledger Supply-Chain
Food supply-chain is a network to connect participants across the food supply through a permissioned, permanent and shared record of food system data.

![Logo](https://alexandrebarros.com/global/hyperledger/supply-chain-03.png?alt=hyperledger-supply-chain)

## Index

  - [About the project](#about-the-project)
  - [About Hyperledger](#about-hyperledger)
  - [Featured technologies](#featured-technologies)
  - [Prerequisites](#prerequisites)
  - [Authors](#authors)
  - [Appendix](#appendix)
 
## About the project
Food supply chain is a Hyperledger blockchain based solution which solves the tracking and tracing of food products in the supply chain so that any product can be traced back to its roots. Building a food tracking system is an effective way to solve food safety issues. Blockchain is well suited for building product tracking systems because of the inherent immutability and consistency of stored data maintained by encryption and consent mechanisms. We propose to build a tracking system that will unite all suppliers, including food warehouses, food processors, and grocery stores, into one store. Create business correspondence with this chain to enable reliable food tracking without disrupting your food supply chain. Implementation and testing are carried out to evaluate the performance of the proposed monitor. The result is a customizable suite of solutions that can increase food safety and freshness, unlock supply chain efficiencies, minimize waste, enhance your brand’s reputation, and contribute directly to your bottom line. 

## Objective
Bring transparency to the food supply chain with Hyperledger Fabric.

## Top factors considerated for the project
Think from all theses perspective:

- Security (protect API authentication, how to store data, API is the bottleneck)
- Operation (VM (under/over resources), Kubernets)
- Cost (how much to spend, Firewall, IDS, etc)
- Reliability (what if something goes down? Frontend and blockchain layers)
- Performance (kind of storage, vm configuration, index in CouchDB, etc)

# About Hyperledger
Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration including leaders in banking, finance, Internet of Things, manufacturing, supply chain, and technology. The Linux Foundation hosts Hyperledger under the foundation. To learn more, visit https://www.hyperledger.org/

## Pillars of Blockchain

- CONSENSUS - Participants will collectively agree that each transaction is valid and the order of the transaction in relation to others. (ex: 2 of 6 or 3 of 6)
- PROVENANCE - Participants know the history of the asset, for example, how its ownership has changed over time, the lifecycle, the history of the asset.
- IMMUTABILITY - No participant can tamper with a transaction once it's agreed.
- FINALITY - Once a transaction is committed, it cannot be reversed, in other words, the data cannot be rolled back to the previous state. If a transaction was in error then a NEW transaction must be used to reverse the error, with both transactions visible.

## Hyperledger Fabric (HLF) Components
![Logo](https://alexandrebarros.com/global/hyperledger/Components.png?alt=hyperledger-components)

## Hyperledger Fabric Architecture
![Logo](https://alexandrebarros.com/global/hyperledger/Architecture.png?alt=hyperledger-architecture)

## Blockchain Explorer
Blockchain explorer provides a dashboard for viewing information about transactions, blocks, node logs, statistics, and smart contracts available on the network. Users will be able to query for specific blocks or transactions and view the complete details. Blockchain explorer can also be integrated with any authentication/authorization platforms (commercial/open source) and will provided appropriate functionality based on the privileges available to the user.

```bash
# Create explorer directory
mkdir explorer
cd explorer

# Download configuration files
wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/examples/net1/config.json
wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/examples/net1/connection-profile/test-network.json -P connection-profile
wget https://raw.githubusercontent.com/hyperledger/blockchain-explorer/main/docker-compose.yaml

# Change network name to net_test
vim docker-compose.yaml

cd fabric-samples/test-network/

# Certify to clean everything
./network.sh down
# Bring up the network with the channels, CA and CouchDB
./network.sh up createChannel -ca -s couchdb
# Deploy the Chain Code
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript

# Return to the explorer directory
cd ..
cd ..
cd explorer

# Copy organization folder from the test network
# We want the criptographic stuff
# This should run inside explorer directory
sudo cp -r ../fabric-samples/test-network/organizations/ .

# Create a KEY
sudo ls organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/
885760d2b14aada616bd20db85d263668634b8b385f825591a516684dfac425d_sk

# Change the KEY in organizations/Org1MSP/adminPrivateKey
vi connection-profile/test-network.json

# 
sudo docker network create docker_test
852cb9532712f64fbd744b2081c5ec41a7ec676be97ad2d8f70130fe033368aa

# Change name to net_test in networks    <<<<<<<<<<<<<<
sudo vim docker-compose.yaml

# Start Docker Compose
sudo docker-compose up
# To run as a deamon use -d
# sudo docker-compose up -d

# To view the Docker Networks
sudo docker network ls

```

Remember to create a firewall rule in your cloud platform before that.
1. VPC network/ Firewall / Create a firewall rule
2. Target: All instances
3. Source: 0.0.0.0/0
4. Specified protocols and ports: tcp : 8080

These are the default user and password. Change it in your first access:
- Username: exploreradmin
- Password: exploreradminpw

# The business case

## Business problem and proposed solution

Retail store business is one of the most important one in our economy. It offers a large variety of products to the end customers at different stores, at different prices, and attracts large amount of people every day. However, to improve experience for the customers another very important thing could be implemented – food supply chain tracking.

Such functionality would allow retail workers and end customers to track and trace food products in the supply chain so that any product can be traced back to its roots. There are many use cases around provenance for food supply chain as it can help troubleshoot supply chain bottlenecks, forecast the shelf life of the fresh produce as its moving through the supply chain, and help pin-pointing the origin of the product in case of recalls.

To implement this in real life, a blockchain-based solution is proposed. Using the enterprise-based blockchain Hyperledger Fabric it is possible to setup many organizations (such as farms, factories, distribution centers, stores) and construct a reliable messaging channel which allows to track any product at any stage from the orchard or sea to the store shelve. One such example is shown on the figure below.

![Logo](https://alexandrebarros.com/global/hyperledger/Picture1.png?alt=hyperledger-supply-chain-diagram)

## Models

At the first stage of design for such a system is to define the model of the business domain. The central entity in this case is product. Tables and figure below show the abstraction model for a generic product which will be used in the system.

Field  |  Type  |  Required  |  Description
------------- | ------------- | -------------  |  -------------
componentProductIds  |  Array<String>  |  Yes  |  Collection of product IDs which are used as components for a given product
id  |  String  |  Yes  |  A unique identifier of a product in the system
barcode  |  String  |  Yes  |  Barcode
name  |  String  |  Yes  |  Product name
placeOfOrigin  |  String  |  Yes  |  Place of origin
productionDate  |  String (as ISO 8601 date)  |  Yes  |  Date of product production (e.g., when product was picked, caught, or cooked)
expirationDate  |  String (as ISO 8601 date)  |  Yes  |  Date when product shelf life expires
unitQuantity  |  Number  |  Yes  |  Product quantity in one unit (used together with unitQuantityType)
unitQuantityType  |  String  |  Yes  |  Unit of measure for a product unit (e.g., kg, liter, oz etc.)
batchQuantity  |  Number  |  No  |  Number of product units in a batch
unitPrice  |  String  |  Yes  |  Price for a product unit (formatted with currency symbol, e.g., “$10.00”)
category  |  String  |  Yes  |  Product category
variety  |  String  |  No  |  Product variety
misc  |  Object  |  No  |  A dictionary of additional miscellaneous data about a product
locationData.previous  |  Array <ProductLocationEntry>  |  No  |  Collection of previous product locations
locationData.current  |  ProductLocationEntry  |  Yes  |  Current product location
location  |  String  |  Yes  |  Current location of a product (e.g., “Etobicoke, ON, Canada”)
arrivalDate  |  String (as ISO 8601 date)  |  Yes  |  Arrival date of the product to a given location



```JS
"product": {
	"componentProductIds": Array<string>,
	"id": String,
	"barcode": String,
	"name": String,
	"placeofOrigin": String,
	"productionDate": String,
	"expirationDate": String,
	"unitQuanitity": Number,
	"unitQuantityType": String,
	"batchQuantity": Number,
	"unitPrice": String,
	"category": String,
	"variety": String,
	"misc": Object,
	"location":
		"previous": Array<ProductLocationEntry>,
		"current": ProductLocationEntry
	}
}

"productLocationEntry":{
	"location": String,
	"arrivalDate": String
}
```

---
A sample instance of this model is shown on figure below. In this case it is apple jam. It is made of another product which is tracked in our system – apples, which has ID of “456”. Place of origin is Etobicoke, ON, Canada (more specific location could be used as well). Unit quantity inside a single apple jam jar is 300 mg. Is it not part of any batch, so it’s tracked individually. The product has no specific variety, nor any additional miscellaneous information. Previous locations of this apple jam jar are Etobicoke and Brampton. And the current location is Walmart Supercentre - 900 Dufferin St, Toronto, ON. Date of each location is tracked as well.

Based on this information, as well as based on previous product IDs which were used to produce a given product a customer can check the whole supply chain to see the place of origin of products used to produce it. At the same time, a store employees can use this information to troubleshoot supply chain bottlenecks.

```JS
{
	"product": {
		"component ProductIds": ["456"],
		"id": "789",
		"barcode": "4353453343",
		"name": "Apple jam",
		"placeoforigin": "Etobicoke, ON, Canada",
		"produceDate": "2021-06-24T18:25:43.511",
		"expirationDate": "2022-06-24T18:25:43.511z",
		"unitQuanitity": "300"
		"unitQuantityType": "mg",
		"batchQuantity": null,
		"unitPrice": "$5.00"
		"category": "Fruit jams",
		"variety": null,
		"misc": {},
		"locationData": {
			"previous":[
			{
				"location": "Etobicoke, ON, Canada",
				"arrivalDate": "2021-06-24T18:25:43.5112"
			},
			{
				"location": "Brampton, ON, Canada",
				"arrivalDate": "2021-06-25T09:05:12.5112"
			}
			],
			"current": {
				"location": "Walmart Supercentre 900 Dufferin St, Toronto, ON",
				"arrivalDate": "2021-06-30T18:00:58.511Z"
			}
		}
	}
}

```

---

Based on the food supply chain shown initially and on the developed models a sample food supply chain is demonstrated on figure below. Initially, apples are picked by the farmer and corresponding product instance is created on the blockchain. Then they get transported to a new location as a whole batch. On this location (e.g., a factory) it gets processed into apple jam. A new product instance should be created to reflect this. The chain is created by saving the ID of the product it is made of (apples with ID “123”). Then the apple jam gets packaged into jars at the same facility and a new product instance is created as a result for each apple jam jar. Apple jam jars then get transported to the store. In the end apple jam is sold to the end customer but it is not required by the system.

![Logo](https://alexandrebarros.com/global/hyperledger/Picture4.png?alt=hyperledger-food-supply-chain-example)

## Modeling contract and transactions

As a result of model creation and product flow analysis the following chaincode operations have been identified as shown in the table below.

Method  |  Input  |  Output  |  Design
-------  |  -------  |  -------  |  -------
Create  |  Product object / IDs of component products  |  None  |  Check required fields (id, component product IDs, name etc.) / Check permissions
ShipTo  |  Product ID / New location  |  None  |  Check new location is not empty / Check permissions
Get  |  Product ID  |  Product object  |  Check product ID is not empty / Check permissions
GetHistory  |  Product ID  |  Product history object  |  Check product ID is not empty / Check permissions

Create operation is needed to create an instance of a product. A product can be a part of a batch, in which case the batchQuantity will not be null. Besides product object itself it accepts an array of component products which can be empty if there are no other products this product is made of. This operation returns nothing, and a couple of validation checks need to be done to make sure required fields are not empty and are in a valid format.

ShipTo operation allows to mark a given product as shipped to another place, basically updating its internal location.previous and location.current properties. New location should not be empty.

Get operation returns a given product by its ID. ID should not be empty as well.

GetHistory operation allows to retrieve a given product together with its component (parent) products it is made of. The returned object corresponds to the structure shown on the figure below.

```JS
{
"product": {
	"component Products": Array<Product>,
	"id": String,
	"barcode": String,
	"name": String,
	"placeoforigin": String,
	"productionDate" String,
	"expirationDate": String,
	"unitQuanitity": Number,
	"unitQuantityType": String,
	"batchQuantity": Number,
	"unitPrice": String,
	"category": String,
	"variety": String,
	"misc": Object,
	"location": {
		"previous": Array<string>,
		"current": String
	}
}

```

Table below shows user roles which can be used for each chaincode operation. The “product creator” role may pertain to users from farms who produce products. The “ShipProductTo” function should be available for “product creator” and “carrier” roles as both should be able to change location of a product from a location to another. The “GetProduct” and “GetProductWithHistory” functions are available for all the roles in the system, including the “store employee” and “customer Web UI”. The latter role is intended to be used by the back end which provides data for the customer Web interface, where users can view product details and supply chain.
	
Operation  |  Farm/Walmart roles
----------  |  ----------
CreateProduct  |  orgManager
ShipProductTo  |  orgManager
GetProduct  |  orgManager / orgEmployee
GetProductWithHistory  |  orgManager / orgEmployee


# Food Supply Chains Details

## State Machine
![Logo](https://alexandrebarros.com/global/hyperledger/StateMachine.png?alt=hyperledger-state-machine)

## Physical Asset in the Network
- Food (Apples, etc)
    
## Possible attributes associated with the Asset
	
Field  |  Type  |  Description
------------- | ------------- | -------------
Cost  |  Number  |  Cost of the product
Manufacture  |  String  |    Name of the manufacture
PackageSize   |  Number  |    THe size of the package
Barcode  |  Number  |  The barcode
Name  |  String    |  Name of the product
PlaceOfOrigin  |  String  |  Place of Origin
ProduceDate  |  Date  |  Date that the product was produced
ExpirationDate  |  Date  |  Date that the product will expire
Quantity  |  Number  |  Quantity of products produced
Type  |  String  |  Type of the product

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
## Diagram
![Logo](https://alexandrebarros.com/global/hyperledger/Diagram.jpeg?alt=hyperledger-diagram)

## Architecture flow
1. The blockchain operator creates a Docker Kubernetes Service.
2. Users creates a Hyperledger Fabric network on a Docker Kubernetes Service, and the operator installs and instantiates the smart contract on the network.
3. The Node.js application server uses the Fabric SDK to interact with the deployed network on the local or cloud platform where Hyperledger is.
4. The React UI uses the Node.js application API to interact and submit transactions to the network.
5. The user interacts with the supply chain application web interface to update and query the blockchain ledger and state.


# Governance

## Rules
Rules are the skeleton of the whole system that defines how business will function. Our system will be built based on the following ruleset.
- Every organization will run a single endorser and committing peer node to validate transactions.
- Decisions on whether to allow a new member to join the system will be decided by voting.
- Which node will become admin will also be decided by voting.
- The decision that has more than 50% of the votes will be implemented.
- Rules will be enforced by the system admin.
- Orderer nodes must only be in odd numbers to establish Raft mechanism.
- Data once pushed on the ledger will remain on the chain forever to make the data and system more reliable and sound.
- Any member found acting malicious must be forever removed from the system.

## Policies
Policies guide decisions in order to follow rules of the system. Our system will have following policies :
- Every organization has the right to participate to vote.
- Any member who is a part of a Private Data Collection should not leak the data to the non-member of the collection.
- Each product that is going to be processed into a different product must be accessible to any member.
- When shipping, location must be updated.

## Roles
Roles dictate what a member can and should do or act within the system. Our system will consist of the following roles :-
Admin:
- Will organize the voting system and act as the chairperson.
- Has read access to every channel and Private Data Collection.
- Will monitor and is responsible for the proper functioning of the system.


# Implementation

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


### Create your first Fabric test network
```bash
cd /fabric-samples/test-network/
./network.sh down
./network.sh up -s couchdb -ca -verbose
```

- Change into the first-network directory and run the generate script that will create the certificates and keys for the entities that are going to exist on our blockchain.
- This will also create the genesis block, the first block on the blockchain, among other things.
- Main script: [byfn.sh](http://byfn.sh/) (well documented and worth reading through)
- Use this to generate cryptographic and network artefacts, bring up the network & run sample scenario

```bash
# before starting, we need to set a path to the binary tools:
export PATH=../bin:$PATH

cd fabric-samples/first-network

# to create the cryptographic and channel artefacts
sudo ./byfn.sh generate

# to bring up the network and run a scenario using chaincode
sudo ./byfn.sh up

# to stop the network and clean up the system
sudo ./byfn.sh down
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

wget https://download.nomachine.com/download/7.6/Linux/nomachine_7.6.2_4_amd64.deb
sudo dpkg -i nomachine_7.6.2_4_amd64.deb
sudo reboot
```

Remember to create a firewall rule in your cloud platform.
1. VPC network/ Firewall / Create a firewall rule
2. Target: All instances
3. Source: 0.0.0.0/0
4. Specified protocols and ports: tcp : 4000


### Install IBM Blockchain Platform VS Code extension
 The IBM Blockchain Platform Developer Tools can be installed as a VS Code extension on your local system to make easier your development:
- [Microsoft Visual Studio Code](https://code.visualstudio.com/)
- [IBM Blockchain plugin](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)

## Apache CouchDB and Futon Web GUI
After having seen CouchDB’s raw API, let’s work with Futon, the built-in administration interface. Futon provides full access to all of CouchDB’s features and makes it easy to work with some of the more complex ideas involved. With [Futon](https://docs.couchdb.org/en/1.6.1/intro/futon.html) we can create and destroy databases; view and edit documents; compose and run MapReduce views; and trigger replication between databases.

To load Futon in your browser, visit: 
```bash
http://[your-ip-address/]:5984/utils/
```
Remember to create a firewall rule in your cloud platform before that.
1. VPC network/ Firewall / Create a firewall rule
2. Target: All instances
3. Source: 0.0.0.0/0
4. Specified protocols and ports: tcp : 5984

These are the default user and password. Change it in your first access:
- Username: admin
- Password: adminpw

More information about [Fauxton](https://couchdb.apache.org/fauxton-visual-guide/index.html) can be found in the link.

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


# Contact

## Authors

Name  | Git Hub | LinkedIn
------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) |
Alexei Pancratov |  [@AlexeiPancratov](https://github.com/alexeipancratov) |  Linkedin link |
Michael Francis Jerome Victor | [@Mike-64](https://github.com/Mike-64)| Linkedin link |
Dhruvam Patel | [@DhruvamPatel](https://github.com/dhruvampatel)| Linkedin link |

## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.
	
## Revisions
Date  |  Revision  |  Description  |  Author
--------  |  --------  |  --------  |  --------	
15/06/2021  |  0.1  |  First Draft  |  Alexandre Rapchan B. Barros
19/06/2021  |  0.2  |  Added TypeScript Chain Code  |  Alexei Pancratov
21/06/2021  |  0.3  |  Fixed issues found during review in Certificates Authorities  |  Michael Francis Jerome Victor
29/06/2021  |  0.4  |  Added SDK and API  |  Dhruvam Patel

## Appendix
- Hyperledger Org: https://www.hyperledger.org/
- Hyperledger Intro: https://hyperledger-fabric.readthedocs.io/en/latest/whatis.html
- Hyperledger GitHub: https://github.com/hyperledger/fabric
- Hyperledger Wiki: https://wiki.hyperledger.org/display/fabric
- Hyperledger Explorer: https://github.com/hyperledger/blockchain-explorer
- What is Private Data: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private-data/private-data.html
- Using Private Data in Fabric: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private_data_tutorial.html
- Whiting your first Chaincode: https://hyperledger-fabric.readthedocs.io/en/release-2.2/chaincode4ade.html
- Graphana: https://grafana.com/grafana/dashboards
- Blockchain Governance Considerations: https://www.blockchain.ae/articles/blockchain-governance-considerations
- Private Data Collections on Hyperledger Fabric: https://github.com/IBM/private-data-collections-on-fabric
- Install NoMachine on Ubuntu: https://kifarunix.com/install-nomachine-on-ubuntu/
- Supply chain proof of concept in Hyperledger Fabric: https://github.com/ialberquilla/hlf1.4-supply-chain

## Interesting Links
- [IBM Food Trust](https://www.ibm.com/blockchain/solutions/food-trust)
- [Fair Trade International](https://www.fairtrade.net/)
