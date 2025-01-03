const { opensea } = require('./config');

async function getAssetPrice(tokenAddress, tokenId) {
    try {
        const asset = await opensea.api.getAsset({
            tokenAddress,
            tokenId
        });
        return asset.orders[0]?.currentPrice;
    } catch (error) {
        console.error('Error fetching asset price:', error);
        return null;
    }
}

module.exports = {
    getAssetPrice
};