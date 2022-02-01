// fetch a list of pins2NFT token data by account from etherscan
const {
  ETHERSCAN_API_URL,
  ETHERSCAN_API,
  CONTRACT_ADDRESS,
} = require("../../../.secret.json");

export default async function handler(req, res) {
  const userAccount = req.query.id;
  // userAccount = 0x9E4C996EFD1Adf643467d1a1EA51333C72a25453
  // CONTRACT_ADDRESS =  0x02894bcB6131b8a9a853f4bbC7198377d0c6f013 (Mumbai)
  console.log("userAccount", userAccount);
  console.log("ETHERSCAN_API", ETHERSCAN_API);
  // Get data from your database
  const tokens = await fetch(
    `${ETHERSCAN_API_URL}/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&address=${userAccount}&page=1&offset=100&sort=asc&apikey=${ETHERSCAN_API}`
  );
  console.log("tokens", tokens);
  const data = await tokens.json();
  res.status(200).json(data.result);
}
