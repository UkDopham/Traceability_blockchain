var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var connectionProfileJson = (await fs.promises.readFile(connectionProfileFileName)).toString();
var connectionProfile = JSON.parse(connectionProfileJson);
var wallet = await Wallets.newFileSystemWallet(walletDirectoryPath);
var gatewayOptions = {
    identity: 'user@example.org',
    wallet: wallet
};
var gateway = new Gateway();
await gateway.connect(connectionProfile, gatewayOptions);
try {
    // Obtain the smart contract with which our application wants to interact
    var network = await gateway.getNetwork(channelName);
    var contract = network.getContract(chaincodeId);
    // Submit transactions for the smart contract
    var args = [arg1, arg2];
    var submitResult = await contract.submitTransaction.apply(contract, __spreadArray(['transactionName'], args));
    // Evaluate queries for the smart contract
    var evalResult = await contract.evaluateTransaction.apply(contract, __spreadArray(['transactionName'], args));
    // Create and submit transactions for the smart contract with transient data
    var transientResult = await contract.createTransaction(transactionName)
        .setTransient(privateData)
        .submit(arg1, arg2);
}
finally {
    // Disconnect from the gateway peer when all work for this client identity is complete
    gateway.disconnect();
}
