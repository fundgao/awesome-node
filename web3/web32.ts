import { Block, FMT_BYTES, FMT_NUMBER, Numbers, Web3 } from "web3";

const web3 = new Web3("https://eth.llamarpc.com");

// use the default return format
web3.eth.getBlock().then((block: Block) => {
  console.log(`Block #${block.number} Hash: ${block.hash}`);
});
// ↳ Block #20735255 Hash: 0xbaea6dbd46fa810a27be4c9eac782602f8efe7512fb30a8455c127b101a23e22

// specify the return format for a single function invocation
web3.eth
  .getBlockNumber({
    bytes: FMT_BYTES.HEX,
    number: FMT_NUMBER.HEX,
  })
  .then((blockNumber: Numbers) => {
    console.log(`Block #${blockNumber}`);
  });
// ↳ Block #0x13c6517

// configure default return format for the web3-eth package
web3.eth.defaultReturnFormat = {
  bytes: FMT_BYTES.UINT8ARRAY,
  number: FMT_NUMBER.HEX,
};

web3.eth.getBlock().then((block: Block) => {
  console.log(`Block #${block.number} Hash: [${block.hash}]`);
});
// ↳ Block #0x13c6517 Hash: [186,234,109,...,162,62,34]
