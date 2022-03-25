import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
import { Contract, providers } from "ethers";
import { getContractAddress } from "../helpers";
import * as IPFS from "ipfs-core";
var ipfs;
const init = async () => {
  if (ipfs) return ipfs;
  ipfs = await IPFS.create();
  const { cid } = await ipfs.add("Hello world");
  console.info("hello cid", cid.toString());
  return ipfs;
};

const create = async (JsonItem, callback, NFT_STORAGE_KEY) => {
  const node = await init();
  callback("0"); // start alter
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
  console.log("obj", JSON.stringify(obj));
  const metadata = new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });

  const { cid } = await node.add(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + cid.toString();
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
  const inst2NFTAddress = await getContractAddress();
  console.log("current contract address:", inst2NFTAddress);
  const inst2NFTAbi = require("./Inst2NFT.json").abi;
  const web3Provider = new providers.Web3Provider(window.$provider);
  const signer = web3Provider.getSigner();
  const inst2NFT_rw = new Contract(inst2NFTAddress, inst2NFTAbi, signer);
  console.log("inst2NFT_rw", inst2NFT_rw);
  console.log("TokenURI", TokenURI);
  const signerAddresss = await signer.getAddress();
  console.log("address", signerAddresss);
  try {
    const tx = await inst2NFT_rw.freeMint(signerAddresss, TokenURI);
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
