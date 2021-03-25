import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

async function main(id:string) {
  try {
    console.log('test')
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'Org1Wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    const connectionProfilePath = path.resolve(__dirname, '..', 'connection.json');
    const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const connectionOptions = { wallet, identity: 'Org1 Admin', discovery: { enabled: true, asLocalhost: true } };
    await gateway.connect(connectionProfile, connectionOptions);
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    console.log('gateway')

    // Get the contract from the network.
    const contract = network.getContract('batches');
    console.log('contract')
    // Submit the specified transaction.
    const result = await contract.evaluateTransaction('getPreviousProducers', id);
    console.log(`${result.toString()}`);

    // Disconnect from the gateway.
    gateway.disconnect();

  } catch (error) {
    console.error('Failed to submit transaction:',error);
    process.exit(1);
  }
}
void main('1');
console.log('test1')