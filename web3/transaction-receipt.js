const { Web3 } = require("web3");

async function main() {
  const web3 = new Web3("http://127.0.0.1:8545/");

  // create a new Web3.js account object with the private key of a Hardhat test account
  const privateKey = "<redacted>";
  // the account is created with a wallet, which makes it easier to use
  const sender = web3.eth.accounts.wallet.add(privateKey)[0];

  // generate a new random Web3.js account object to receive the transaction
  const receiver = web3.eth.accounts.create();

  // log initial balances
  console.log(
    "Initial sender balance:",
    // account balance in wei
    await web3.eth.getBalance(sender.address)
  );
  console.log(
    "Initial receiver balance:",
    // account balance in wei
    await web3.eth.getBalance(receiver.address)
  );

  // sign and send the transaction
  const receipt = await web3.eth.sendTransaction({
    from: sender.address,
    to: receiver.address,
    // amount in wei
    value: 100,
  });

  // log transaction receipt
  console.log(receipt);

  // log final balances
  console.log(
    "Final sender balance:",
    await web3.eth.getBalance(sender.address)
  );
  console.log(
    "Final receiver balance:",
    await web3.eth.getBalance(receiver.address)
  );
}

main();
