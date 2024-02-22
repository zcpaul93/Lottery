require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
 

const PRIVATE_KEY = "fd48588c504a8504d8fe0de0d47fb087f09ff67a8182984fc741346ff7204265";

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
