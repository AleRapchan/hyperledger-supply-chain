
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
