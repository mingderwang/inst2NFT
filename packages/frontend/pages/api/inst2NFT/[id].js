import config from "../../../inst2nft.config";
const { defaultNetwork, networks } = config;

// fetch a list of inst2NFT token data by account from etherscan
const { ETHERSCAN_API_URL, ETHERSCAN_API } = require("../../../.secret.json");

export default async function handler(req, res) {
  const userAccount = req.query.id;
  const currentNetwork = networks[defaultNetwork];
  const CONTRACT_ADDRESS = currentNetwork.contractAddress;
  // userAccount = 0x9E4C996EFD1Adf643467d1a1EA51333C72a25453
  //console.log("userAccount", userAccount);
  //console.log("ETHERSCAN_API", ETHERSCAN_API);
  // Get data from your database
  const tokens = await fetch(
    `${ETHERSCAN_API_URL}/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&address=${userAccount}&page=1&offset=100&sort=asc&apikey=${ETHERSCAN_API}`
  );
  //console.log("NFT tokens", tokens);
  const data = await tokens.json();
  res.status(200).json(data.result);
}
