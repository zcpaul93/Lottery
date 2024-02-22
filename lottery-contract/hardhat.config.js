require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
 

const PRIVATE_KEY = "xxxxxx";

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};
