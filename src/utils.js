function formatPrice(price) {
    return price ? `${Web3.utils.fromWei(price.toString(), 'ether')} ETH` : 'No price available';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    formatPrice,
    sleep
};