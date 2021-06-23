# Hyperledger Supply-Chain
Food supply-chain is a network to connect participants across the food supply through a permissioned, permanent and shared record of food system data.

![Logo](https://alexandrebarros.com/global/hyperledger/supply-chain-03.png?alt=hyperledger-supply-chain)


## About the project
Food supply chain is a Hyperledger blockchain based solution which solves the tracking and tracing of food products in the supply chain so that any product can be traced back to its roots. Building a food tracking system is an effective way to solve food safety issues. Blockchain is well suited for building product tracking systems because of the inherent immutability and consistency of stored data maintained by encryption and consent mechanisms. We propose to build a tracking system that will unite all suppliers, including food warehouses, food processors, and grocery stores, into one store. Create business correspondence with this chain to enable reliable food tracking without disrupting your food supply chain. Implementation and testing are carried out to evaluate the performance of the proposed monitor. The result is a customizable suite of solutions that can increase food safety and freshness, unlock supply chain efficiencies, minimize waste, enhance your brand’s reputation, and contribute directly to your bottom line. 

## About Hyperledger
Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration including leaders in banking, finance, Internet of Things, manufacturing, supply chain, and technology. The Linux Foundation hosts Hyperledger under the foundation. To learn more, visit https://www.hyperledger.org/

## Objective
Bring transparency to the food supply chain with Hyperledger Fabric.

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
- [Docker](https://www.docker.com/products) - latest
- [Docker] Compose(https://docs.docker.com/compose/overview/) - latest
- [NPM](https://www.npmjs.com/get-npm) - latest
- [nvm](https://github.com/AleRapchan/private-data-collections-on-fabric/blob/master) - latest
- [Node.js](https://nodejs.org/en/download/) - Node v8.9.x
- [Git] client(https://git-scm.com/downloads) - latest

You could use your local docker containers or create a cloud account in IBM Cloud, Azure, AWS or Google Cloud Platform.

## Authors

Name  | Git Hub | LinkedIn
------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) |
Alexei Pancratov |  [@AlexeiPancratov](https://github.com/alexeipancratov) |  Linkedin link |
Michael Francis Jerome Victor | [@Mike-64](https://github.com/Mike-64)| Linkedin link |
Dhruvam Patel | [@DhruvamPatel](https://github.com/dhruvampatel)| Linkedin link \|


## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.

## Appendix
- Hyperledger Org: https://www.hyperledger.org/
- Hyperledger Intro: https://hyperledger-fabric.readthedocs.io/en/latest/whatis.html
- Hyperledger GitHub: https://github.com/hyperledger/fabric
- Hyperledger Wiki: https://wiki.hyperledger.org/display/fabric
- What is Private Data: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private-data/private-data.html
- Using Private Data in Fabric: https://hyperledger-fabric.readthedocs.io/en/release-2.2/private_data_tutorial.html

