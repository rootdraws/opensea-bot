const { opensea } = require('./config');

async function getOwnedTokenIds(contractAddress, ownerAddress) {
    try {
        let allAssets = [];
        let offset = 0;
        const limit = 50;  // OpenSea's max limit per request
        
        // Keep fetching until we have all assets
        while (true) {
            console.log(`Fetching tokens ${offset} to ${offset + limit}...`);
            
            const assets = await opensea.api.getAssets({
                asset_contract_address: contractAddress,
                owner: ownerAddress,
                limit: limit,
                offset: offset
            });
            
            if (assets.assets.length === 0) break;
            
            allAssets = [...allAssets, ...assets.assets];
            offset += limit;
            
            // Add a small delay between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        return allAssets.map(asset => ({
            tokenId: asset.tokenId,
            name: asset.name
        }));
    } catch (error) {
        console.error('Error fetching owned tokens:', error);
        return [];
    }
}

module.exports = {
    getOwnedTokenIds
};