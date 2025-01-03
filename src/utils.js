const { web3 } = require('./config');

function formatPrice(price) {
    return price ? `${web3.utils.fromWei(price.toString(), 'ether')} ETH` : 'No price available';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to round prices to 4 decimal places
function roundPrice(price) {
    return Math.round(price * 10000) / 10000;
}

module.exports = {
    formatPrice,
    sleep,
    roundPrice
};