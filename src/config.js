require('dotenv').config();
const { OpenSeaSDK, Chain } = require('opensea-js');
const { ethers } = require('ethers');

// Create provider
const provider = new ethers.providers.JsonRpcProvider(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

// Add wallet to provider
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize OpenSea SDK with Base chain
const opensea = new OpenSeaSDK(signer, {
    chain: Chain.Base,  // Specify Base chain
    apiKey: process.env.OPENSEA_API_KEY,
});

module.exports = {
    opensea,
    provider,
    signer
};