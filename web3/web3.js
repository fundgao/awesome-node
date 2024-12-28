import { Web3 } from "web3";

// private RPC endpoint
const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_ID");

// or public RPC endpoint
// const web3 = new Web3('https://eth.llamarpc.com');

web3.eth.getBlockNumber().then(console.log);
// ↳ 18849658n

// get the balance of an address
await web3.eth.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
// ↳ 114438180989009447638n

// get last block number
await web3.eth.getBlockNumber();
// ↳ 18849658n

// get the chain id of the current provider
await web3.eth.getChainId();
// ↳ 1n

// get the nonce of an address
await web3.eth.getTransactionCount(
  "0x37826D8B5F4B175517A0f42c886f8Fca38C55Fe7"
);
// ↳ 7n

// get the current gas price
await web3.eth.getGasPrice();
// ↳ 23879160756n

// create random wallet with 1 account
web3.eth.accounts.wallet.create(1);

// the private key must start with the "0x" prefix
const account = web3.eth.accounts.wallet.add(
  "0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec"
);

console.log(account[0].address);
//↳ 0xcE6A5235d6033341972782a15289277E85E5b305

console.log(account[0].privateKey);
//↳ 0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec

// create transaction object to send 1 eth to '0xa32...c94' address from the account[0]
const tx = {
  from: account[0].address,
  to: "0xa3286628134bad128faeef82f44e99aa64085c94",
  value: web3.utils.toWei("1", "ether"),
};
// the "from" address must match the one previously added with wallet.add

// send the transaction
const txReceipt = await web3.eth.sendTransaction(tx);

console.log("Tx hash:", txReceipt.transactionHash);
// ↳ Tx hash: 0x03c844b069646e08af1b6f31519a36e3e08452b198ef9f6ce0f0ccafd5e3ae0e

// Uniswap token smart contract address (Mainnet)
const address = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

// you can find the complete ABI on etherscan.io
// https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984#code
const ABI = [
  {
    name: "symbol",
    outputs: [{ type: "string" }],
    type: "function",
  },
  {
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    type: "function",
  },
];

// instantiate the smart contract
const uniswapToken = new web3.eth.Contract(ABI, address);

// make the call to the contract
const symbol = await uniswapToken.methods.symbol().call();

console.log("Uniswap symbol:", symbol);
// ↳ Uniswap symbol: UNI

// make the call to the contract
const totalSupply = await uniswapToken.methods.totalSupply().call();

console.log("Uniswap Total supply:", totalSupply);
// ↳ Uniswap Total Supply: 1000000000000000000000000000n

// address to send the token
const to = "0xcf185f2F3Fe19D82bFdcee59E3330FD7ba5f27ce";

// value to transfer (1 with 18 decimals)
const value = web3.utils.toWei("1", "ether");

// send the transaction => return the Tx receipt
const txReceipt2 = await uniswapToken.methods
  .transfer(to, value)
  .send({ from: account[0].address });

console.log("Tx hash:", txReceipt2.transactionHash);
// ↳ Tx hash: 0x14273c2b5781cc8f1687906c68bfc93482c603026d01b4fd37a04adb6217ad43

// WebSocket provider
const web32 = new Web3("wss://ethereum.publicnode.com");

// instantiate contract
const uniswapToken2 = new web32.eth.Contract(ABI, address);

// create the subscription to all the 'Transfer' events
const subscription = uniswapToken2.events.Transfer();

// listen to the events
subscription.on("data", console.log);
