require('dotenv').config();
const { OpenSeaSDK, Network } = require('opensea-js');
const { Web3 } = require('web3');

// Initialize Web3 with Base network
const provider = new Web3.providers.HttpProvider(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);
const web3 = new Web3(provider);

// Initialize OpenSea SDK with Base network
const opensea = new OpenSeaSDK(provider, {
    networkName: Network.Base, // Changed to Base
    apiKey: process.env.OPENSEA_API_KEY
});

module.exports = {
    web3,
    opensea,
    provider
};