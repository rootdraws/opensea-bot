const axios = require('axios');

async function getOwnedTokenIds(contractAddress, ownerAddress) {
    try {
        console.log('Fetching NFTs...');
        console.log('Contract:', contractAddress);
        console.log('Owner:', ownerAddress);

        const opensea = axios.create({
            baseURL: 'https://api.opensea.io/api',
            headers: {
                'X-API-KEY': process.env.OPENSEA_API_KEY,
                'Accept': 'application/json'
            }
        });

        // First, get all NFTs from the wallet
        const response = await opensea.get(`/v2/chain/base/account/${ownerAddress}/nfts`, {
            params: {
                limit: 100
            }
        });

        if (!response.data || !response.data.nfts) {
            console.log('No NFTs found');
            return [];
        }

        // Filter for our specific contract
        const tokens = response.data.nfts
            .filter(nft => nft.contract.toLowerCase() === contractAddress.toLowerCase())
            .map(nft => ({
                tokenId: nft.identifier,
                name: nft.name
            }));

        console.log(`Found ${tokens.length} NFTs from contract ${contractAddress}`);
        return tokens;

    } catch (error) {
        console.error('Error fetching owned tokens:', error.response?.data || error.message);
        return [];
    }
}

module.exports = {
    getOwnedTokenIds
};