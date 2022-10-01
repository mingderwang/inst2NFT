import * as dotenv from "dotenv";
dotenv.config();

const defaultNetwork = "polygon"; // or "polygon"
const TestnetOpenSeaURL = "https://testnets.opensea.io/collection/inst2nft-v2"; // for https://rinkeby.etherscan.io/address/0x8b756d45dd3a77124a0e762c7023e094cc035b40#code
const MainnetOpenSeaURL = "https://opensea.io/collection/inst2nft-v2";

const config = {
  defaultNetwork,
  networks: {
    rinkeby: {
      contractAddress: "0x8b756D45dD3a77124a0E762C7023e094cc035B40",
      openseaURL: TestnetOpenSeaURL,
    },
    polygon: {
      contractAddress: "0x8B3d0cF3795cdb0e1613F6A8a294a965dA93BEFc",
      openseaURL: MainnetOpenSeaURL,
    },
  },
};

export default config;
