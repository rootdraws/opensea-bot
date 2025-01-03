# OpenSea Bulk Listing Bot

A Node.js bot for listing multiple NFTs on OpenSea using a bell curve distribution strategy (30-40-30 split) across a price range.

## Setup

1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env` and add your keys
4. Update contract address in `index.js`
5. Run with `node index.js`

## Price Distribution

Lists NFTs in three tiers:

- 30% of NFTs: 0.042 to 0.051 ETH
- 40% of NFTs: 0.051 to 0.060 ETH
- 30% of NFTs: 0.060 to 0.069 ETH

## Dependencies

- opensea-js
- web3
- dotenv

## Environment Variables

```OPENSEA_API_KEY=your_opensea_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
WALLET_ADDRESS=your_wallet_address
```

## Note

Includes 2-second delay between listings to avoid rate limits.
