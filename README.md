# OpenSea Trading Bot

A Node.js-based trading bot for interacting with the OpenSea NFT marketplace.

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

## Project Structure

```project/
├── src/
│   ├── config.js       - API and Web3 configuration
│   ├── nftFetcher.js   - NFT fetching functions
│   ├── priceTracker.js - Price tracking functions
│   └── utils.js        - Helper utilities
└── index.js            - Main entry point
```

## Functions

### NFT Fetching (`nftFetcher.js`)

#### `getOwnedTokenIds(contractAddress, ownerAddress)`

Fetches all token IDs owned by a specific address for a given contract.

- Parameters:
  - `contractAddress`: The NFT contract address
  - `ownerAddress`: The wallet address to check
- Returns: Array of objects containing:
  - `tokenId`: The NFT's token ID
  - `name`: The NFT's name
- Limit: Returns up to 50 tokens

### Price Tracking (`priceTracker.js`)

#### `getAssetPrice(tokenAddress, tokenId)`

Fetches the current price of a specific NFT.

- Parameters:
  - `tokenAddress`: The NFT contract address
  - `tokenId`: The specific token ID
- Returns: Current price in wei, or null if no active listings

### Utilities (`utils.js`)

#### `formatPrice(price)`

Formats a wei price value into a readable ETH string.

- Parameters:
  - `price`: Price in wei
- Returns: Formatted string (e.g., "0.5 ETH")

#### `sleep(ms)`

Utility function for adding delays.

- Parameters:
  - `ms`: Milliseconds to sleep
- Returns: Promise that resolves after the specified time

## Configuration (`config.js`)

Handles initialization of:

- Web3 provider (Alchemy)
- OpenSea SDK
- Network configuration

## Environment Variables

Required environment variables in `.env`:

```OPENSEA_API_KEY=your_opensea_api_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
PRIVATE_KEY=your_ethereum_wallet_private_key_here
```

## Usage

Run the bot:

```bash
node index.js
```

## Example

```javascript
const { getOwnedTokenIds } = require('./src/nftFetcher');
const { getAssetPrice } = require('./src/priceTracker');

async function main() {
    const contractAddress = '0x...';  // Your NFT contract
    const ownerAddress = '0x...';     // Your wallet address
    
    const tokens = await getOwnedTokenIds(contractAddress, ownerAddress);
    console.log('My NFTs:', tokens);
}
```
