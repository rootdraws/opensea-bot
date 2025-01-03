const { getOwnedTokenIds } = require('./src/nftFetcher');
const { getAssetPrice } = require('./src/priceTracker');
const { formatPrice } = require('./src/utils');

async function main() {
    const contractAddress = '0x...'; // NFT contract address
    const ownerAddress = '0x...';    // Your wallet address

    console.log('Fetching your owned tokens...');
    const ownedTokens = await getOwnedTokenIds(contractAddress, ownerAddress);
    console.log('Your owned tokens:', ownedTokens);
    
    // Example: Get price for first owned token if you have any
    if (ownedTokens.length > 0) {
        const price = await getAssetPrice(contractAddress, ownedTokens[0].tokenId);
        console.log(`Price for token ${ownedTokens[0].tokenId}: ${formatPrice(price)}`);
    }
}

main().catch(console.error);