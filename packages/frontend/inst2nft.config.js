import * as dotenv from "dotenv";
dotenv.config();

const defaultNetwork = "rinkeby"; // or "polygon"
const TestnetOpenSeaURL = "https://testnets.opensea.io/collection/inst2nft";
const MainnetOpenSeaURL = "https://opensea.io/collection/inst2nft";

const config = {
  defaultNetwork,
  networks: {
    rinkeby: {
      contractAddress: "0x8b756D45dD3a77124a0E762C7023e094cc035B40",
      openseaURL: TestnetOpenSeaURL,
    },
    polygon: {
      contractAddress: "0xD23094F9d4b04A3217Adc38977884d5477d7739D",
      openseaURL: MainnetOpenSeaURL,
    },
  },
};

export default config;
