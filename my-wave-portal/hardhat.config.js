// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DrS0Icf2_Z7-1jUu8Eq0oIm-9TCdu7-D",
      accounts: ["058ed1bfcc8b160b7cdbbe1b0e45ab559409a7af9aaa0a454c83a20370688c5a"],
    },
  },
};