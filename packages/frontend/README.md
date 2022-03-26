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
