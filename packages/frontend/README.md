# to run server on https://localhost
> install caddy from https://caddyserver.com/docs/install
```
caddy run
```
and
```
yarn dev
```

# for deployment to polygon
```
diff --git a/packages/frontend/inst2nft.config.js b/packages/frontend/inst2nft.config.js
index 48eab97..ac54de9 100644
--- a/packages/frontend/inst2nft.config.js
+++ b/packages/frontend/inst2nft.config.js
@@ -1,7 +1,7 @@
 import * as dotenv from "dotenv";
 dotenv.config();

-const defaultNetwork = "rinkeby"; // or "polygon"
+const defaultNetwork = "polygon"; // or "polygon"
 const TestnetOpenSeaURL = "https://testnets.opensea.io/collection/inst2nft";
 const MainnetOpenSeaURL = "https://opensea.io/collection/inst2nft";
```

# vercel for rinkeny (testnet)
```
{
  "version": 2,
  "alias": ["rinkeby.inst.2nft.me"]
}
```

# vercel for polygon (mainnet)
```
{
  "version": 2,
  "alias": ["polygon.inst.2nft.me"]
}
```
> also need to change .env INSTAGRAM_CLIENT_SECRET and INSTAGRAM_CLIENT_ID in packages/frontent
# for rinkeby
```
➜  hardhat git:(rinkeby) ✗ npx hardhat verify 0xF44dD72F51C2803d64fa4000169E3cF219d32648 --network rinkeby
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/Inst2NFT.sol:Inst2NFT at 0xF44dD72F51C2803d64fa4000169E3cF219d32648
for verification on Etherscan. Waiting for verification result...

Successfully verified contract Inst2NFT on Etherscan.
https://rinkeby.etherscan.io/address/0xF44dD72F51C2803d64fa4000169E3cF219d32648#code
```
