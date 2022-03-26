import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
import { Contract, providers } from "ethers";
import { getContractAddress } from "../helpers";
import * as IPFS from "ipfs-core";

var ipfs;
const init = async () => {
  if (ipfs) return ipfs;
  ipfs = await IPFS.create({ repo: "ok" + Math.random() });
  //const { cid } = await ipfs.add("Hello world");
  //console.info("testing cid", cid.toString());
  return ipfs;
};

const create = async (JsonItem, callback) => {
  callback("0"); // start alter
  const node = await init();
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

  const { cid } = await node.add(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + cid.toString();
  //  const metadataUrl = "https://ipfs.io/ipfs/QmSf2Sc9RJyZMku2GTSD4Ksduj7rdXUz1AjMyAjZGG8W6w";
  const result = await callContract(metadataUrl, callback);
  return { ipfs_url: metadataUrl };
};

export const nft_storage = {
  create,
  init,
};

export const callContract = async (TokenURI, mintFailCallback) => {
  const { contractaddress } = await getContractAddress();
  const inst2NFTAddress = contractaddress;
  const inst2NFTAbi = require("./Inst2NFT.json").abi;
  const web3Provider = new providers.Web3Provider(window.$provider);
  const signer = web3Provider.getSigner();
  const inst2NFT_rw = new Contract(inst2NFTAddress, inst2NFTAbi, signer);
  const signerAddresss = await signer.getAddress();
  try {
    const tx = await inst2NFT_rw.freeMint(signerAddresss, TokenURI);
    const receipt = await tx.wait();
    mintFailCallback("1");
    return receipt;
  } catch (e) {
    mintFailCallback("2");
    return {};
  }
};
