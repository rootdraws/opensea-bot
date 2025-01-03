const axios = require('axios');

const opensea = axios.create({
    baseURL: 'https://api.opensea.io',
    headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY,
        'Accept': 'application/json'
    }
});

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createBellCurveListings(contractAddress, tokenIds, priceRanges) {
    for (const range of priceRanges) {
        const { minPrice, maxPrice, quantity } = range;
        const tokensForRange = tokenIds.slice(0, quantity);
        tokenIds = tokenIds.slice(quantity);
        
        const priceStep = (maxPrice - minPrice) / (quantity - 1);

        console.log(`\nCreating ${quantity} listings from ${minPrice} ETH to ${maxPrice} ETH`);

        for (let i = 0; i < tokensForRange.length; i++) {
            const rawPrice = minPrice + (i * priceStep);
            const price = Math.round(rawPrice * 10000) / 10000;
            const tokenId = tokensForRange[i];

            try {
                const response = await opensea.post('/api/v2/orders/base/seaport/listings', {
                    chain: 'base',
                    protocol: 'seaport',
                    order: {
                        parameters: {
                            offerer: process.env.WALLET_ADDRESS,
                            offer: [{
                                itemType: 2,  // NFT
                                token: contractAddress,
                                identifierOrCriteria: tokenId.toString(),
                                startAmount: "1",
                                endAmount: "1"
                            }],
                            consideration: [{
                                itemType: 0,  // ETH
                                token: "0x0000000000000000000000000000000000000000",
                                identifierOrCriteria: "0",
                                startAmount: (price * 1e18).toString(), // Convert ETH to wei
                                endAmount: (price * 1e18).toString(),
                                recipient: process.env.WALLET_ADDRESS
                            }],
                            orderType: 0,  // FULL_OPEN
                            startTime: Math.floor(Date.now() / 1000).toString(),
                            endTime: (Math.floor(Date.now() / 1000) + 7776000).toString(), // 90 days
                            zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
                            zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
                            salt: Date.now().toString(),
                            conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                            totalOriginalConsiderationItems: 1,
                            counter: 0
                        }
                    }
                });

                console.log(`Listed token ${tokenId} for ${price} ETH`);
                console.log('Response:', response.data);
                
                await sleep(5000);
                
            } catch (error) {
                if (error.response?.data?.detail?.includes('throttled')) {
                    console.log('Rate limited. Waiting 60 seconds...');
                    await sleep(60000);
                    i--;
                    continue;
                }
                console.error(`Error listing token ${tokenId}:`, error.response?.data || error.message);
                await sleep(2000);
            }
        }
    }
}

module.exports = {
    createBellCurveListings
};