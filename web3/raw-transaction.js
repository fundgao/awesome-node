const { Web3 } = require("web3");

async function main() {
  const web3 = new Web3("http://127.0.0.1:8545/");

  const privateKey = "<redacted>";
  // import the Hardhat test account without the use of a wallet
  const sender = web3.eth.accounts.privateKeyToAccount(privateKey);

  const receiver = web3.eth.accounts.create();

  // used to calculate the transaction's maxFeePerGas
  const block = await web3.eth.getBlock();

  const transaction = {
    from: sender.address,
    to: receiver.address,
    value: 100,
    // the following two properties must be included in raw transactions
    maxFeePerGas: block.baseFeePerGas * 2n,
    maxPriorityFeePerGas: 100000,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    sender.privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log(receipt);
}

main();
