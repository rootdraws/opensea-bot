const { opensea } = require('./config');

async function getOwnedTokenIds(contractAddress, ownerAddress) {
    try {
        const assets = await opensea.api.getAssets({
            asset_contract_address: contractAddress,
            owner: ownerAddress,
            limit: 50,
            offset: 0
        });
        
        return assets.assets.map(asset => ({
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