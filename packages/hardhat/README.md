# Inst2NFT.sol
> On Rinkeby testnet
```
0x830Db77829307170f6237e4b356091E488311a72
```


# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

# Polygon

```
➜  hardhat git:(polygon) ✗ npx hardhat run scripts/deploy.ts
Generating typings for: 24 artifacts in dir: typechain for target: ethers-v5
Successfully generated 39 typings!
Compiled 24 Solidity files successfully
Deploying Inst2NFT...
Inst2NFT deployed to: 0x8B3d0cF3795cdb0e1613F6A8a294a965dA93BEFc
```
> after get real address of the Inst2NFT contract.

```
➜  hardhat git:(polygon) ✗ npx hardhat verify 0x58719A1434692C040Bd04647481386C7B4dc20d4 --network polygon
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/Inst2NFT.sol:Inst2NFT at 0x58719A1434692C040Bd04647481386C7B4dc20d4
for verification on Etherscan. Waiting for verification result...

Successfully verified contract Inst2NFT on Etherscan.
https://polygonscan.com/address/0x58719A1434692C040Bd04647481386C7B4dc20d4#code
```
> hardhat.config.ts
```
const defaultNetwork = 'polygon'
...
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
```
> .env
```
POLYGONSCAN_API_KEY=YHRM33PWZ1Q3GUG1YPTHCD1PN4R8
```
