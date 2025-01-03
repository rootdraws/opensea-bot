const { opensea } = require('./config');
const { web3 } = require('./config');

async function createBellCurveListings(contractAddress, tokenIds, priceRanges) {
    const expirationTime = Math.floor(Date.now() / 1000) + (3 * 30 * 24 * 60 * 60); // 3 months

    let currentIndex = 0;
    
    for (const range of priceRanges) {
        const { minPrice, maxPrice, quantity } = range;
        const tokensForRange = tokenIds.slice(currentIndex, currentIndex + quantity);
        const priceStep = (maxPrice - minPrice) / (quantity - 1);

        console.log(`\nCreating ${quantity} listings from ${minPrice} ETH to ${maxPrice} ETH`);

        for (let i = 0; i < tokensForRange.length; i++) {
            const rawPrice = minPrice + (i * priceStep);
            // Round to 4 decimal places
            const price = Math.round(rawPrice * 10000) / 10000;
            const priceInWei = web3.utils.toWei(price.toString(), 'ether');
            const tokenId = tokensForRange[i];

            try {
                await opensea.createSellOrder({
                    asset: {
                        tokenId,
                        tokenAddress: contractAddress,
                    },
                    startAmount: priceInWei,
                    expirationTime: expirationTime,
                    accountAddress: process.env.WALLET_ADDRESS
                });

                console.log(`Listed token ${tokenId} for ${price} ETH`);
                
                // Add a small delay between listings to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                console.error(`Error listing token ${tokenId}:`, error);
            }
        }
        
        currentIndex += quantity;
    }
}

module.exports = {
    createBellCurveListings
};