const { web3, opensea } = require('./config');

async function checkAndSetApprovals(contractAddress, walletAddress) {
    try {
        console.log('Checking OpenSea approvals...');
        
        const approved = await opensea.isApproved(walletAddress, contractAddress);
        
        if (!approved) {
            console.log('Approval needed. Please approve the OpenSea contract...');
            await opensea.approve(contractAddress);
            console.log('Approval granted to OpenSea');
        } else {
            console.log('OpenSea already approved for this collection');
        }
        
        return true;
    } catch (error) {
        console.error('Error checking/setting approvals:', error);
        return false;
    }
}

module.exports = {
    checkAndSetApprovals
};