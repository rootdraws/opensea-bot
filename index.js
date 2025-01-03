const { getOwnedTokenIds } = require('./src/nftFetcher');
const { createBellCurveListings } = require('./src/listingManager');

async function main() {
    const contractAddress = '0x53d8cbfa0abfeab01ab5997827e67069c6b46c7a';
    const ownerAddress = process.env.WALLET_ADDRESS;
    
    // Get all your tokens
    console.log('Fetching your owned tokens...');
    const ownedTokens = await getOwnedTokenIds(contractAddress, ownerAddress);
    
    if (ownedTokens.length === 0) {
        console.log('No tokens found in your wallet');
        return;
    }

    console.log(`Found ${ownedTokens.length} tokens`);

    // Extract token IDs
    const tokenIds = ownedTokens.map(token => token.tokenId);
    
    // Define bell curve price ranges (30-40-30 distribution)
    const priceRanges = [
        {
            minPrice: 0.042,
            maxPrice: 0.051,
            quantity: 30  // Lower 30%
        },
        {
            minPrice: 0.051,
            maxPrice: 0.060,
            quantity: 40  // Middle 40%
        },
        {
            minPrice: 0.060,
            maxPrice: 0.069,
            quantity: 30  // Upper 30%
        }
    ];
    
    console.log('Starting to create listings...');
    // Create bell curve distributed listings
    await createBellCurveListings(
        contractAddress,
        tokenIds,
        priceRanges
    );
}

main().catch(console.error);