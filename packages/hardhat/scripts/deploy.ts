// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface. 
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Inst2NFT = await ethers.getContractFactory("Inst2NFT");
  console.log("Deploying Inst2NFT...");
  const inst2nft = await upgrades.deployProxy(Inst2NFT,[] , {
    initializer: "initialize",
  });

  await inst2nft.deployed();

  console.log("Inst2NFT deployed to:", inst2nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
