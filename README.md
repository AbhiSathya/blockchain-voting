# Blockchain Voting System  

A decentralized voting system built using **React.js** for the frontend, **Node.js & Express** for the backend, and **Ethereum blockchain** with **Ganache, Truffle, and Web3.js** for smart contract deployment and interaction.  

## Features  
- **Decentralized & Transparent** voting process  
- **Ethereum Smart Contracts** for secure vote storage  
- **Web3.js Integration** for blockchain interaction  
- **React Frontend** for a user-friendly voting interface  
- **Node.js Backend** to facilitate API interactions  
- **Ganache** for local blockchain simulation  
- **Truffle** for smart contract deployment and testing  

## Tech Stack  
### Frontend  
- React.js  
- Web3.js  
- Bootstrap

### Backend  
- Node.js  
- Express.js  
- Nodemon (for development)  

### Blockchain  
- Solidity (Smart Contracts)  
- Truffle  
- Ganache  
- Web3.js  

## Installation & Setup  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** and **npm**  
- **Ganache** (for local blockchain)  
- **Truffle**  
- **Metamask** (for interacting with blockchain)  

## 2. Clone the Repository  
```sh
git clone https://github.com/your-username/blockchain-voting.git
cd blockchain-voting
## 3. Install Dependencies
Frontend

cd client
npm install

Backend

cd ../backend
npm install

4. Blockchain Setup
Start Ganache-cli or Ganache GUI
Open Ganache and create a new workspace or use the CLI:

cd truffle
truffle migrate --reset

Run the Application
Start the Backend Server

cd backend
nodemon index.js

Start the Frontend

cd client
npm start

Usage
Open the frontend in your browser at http://localhost:3000

Connect Metamask with the local blockchain network

Create Election and cast votes securely on the blockchain

View real-time vote counts

Smart Contract Details
The voting system uses an Ethereum smart contract to store votes in an immutable way. The contract is written in Solidity and deployed using Truffle.

Future Improvements
Deploy to a live Ethereum testnet (e.g., Goerli, Sepolia)

Implement IPFS for decentralized storage of voter data

Enable role-based voting permissions

License
This project is licensed under the MIT License.
