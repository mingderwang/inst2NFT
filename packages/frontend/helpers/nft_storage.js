import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
import { Contract, providers } from "ethers";
const { CONTRACT_ADDRESS } = require("../.secret.json");

const create = async (JsonItem, callback, NFT_STORAGE_KEY) => {
  callback("0"); // start alter
  const apiKey = NFT_STORAGE_KEY;
  const client = new NFTStorage({ token: apiKey });
  const obj = {
    name: JsonItem.caption ? JsonItem.caption : "Unknown",
    description: `From ${JsonItem.username}'s Instagram`,
    external_url: JsonItem.permalink,
    image: JsonItem.media_url,
    creator: JsonItem.username,
    created_at: JsonItem.timestamp,
    media_type: JsonItem.media_type,
    id: JsonItem.id,
    created_with: "https://inst.2nft.me/",
  };
  const metadata = new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;
  // https://ipfs.io/ipfs/bafkreigbq7i3drrdomco4l45rc6luta4kg2y3en6xm52z3ote4ezbrbe5e
  console.log("successfully generate metadata on ", metadataUrl);
  const result = await callContract(metadataUrl, callback); // to TokenURI
  console.log("callContract result", result);
  return { ipfs_url: metadataUrl };
};

export const nft_storage = {
  create,
};

export const callContract = async (TokenURI, mintFailCallback) => {
  const inst2NFTAddress = CONTRACT_ADDRESS;
  console.log("current contract address:", inst2NFTAddress);
  // "0xD23094F9d4b04A3217Adc38977884d5477d7739D"; // for Polygon Mainet
  // TODO, move this to process.env.CONTRACT_ADDRESS
  const inst2NFTAbi = require("./Inst2NFT.json").abi;
  const web3Provider = new providers.Web3Provider(window.$provider);
  const signer = web3Provider.getSigner();
  const inst2NFT_rw = new Contract(inst2NFTAddress, inst2NFTAbi, signer);
  try {
    const tx = await inst2NFT_rw.freeMint(signer.getAddress(), TokenURI);
    console.log("freemint", tx);
    const receipt = await tx.wait();
    console.log("wait", receipt);
    mintFailCallback("1");
    return receipt;
  } catch (e) {
    console.log("error", e);
    mintFailCallback("2");
    return {};
  }
};
