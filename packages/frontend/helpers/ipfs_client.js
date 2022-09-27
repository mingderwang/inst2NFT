import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
import { Contract, providers } from "ethers";
import { getContractAddress } from ".";
import * as IPFS from "ipfs-core";

var ipfs;
const init = async () => {
  if (ipfs) return ipfs;
  ipfs = await IPFS.create({ repo: "ok" + Math.random() }); //TODO? have to have, why
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
  //console.log("metadataUrl", metadataUrl);
  return { ipfs_url: metadataUrl };
};

const createFromURL = async (imageURL, callback) => {
  callback("4"); // start create image
  //console.log("4---", imageURL);
  const node = await init();
  const request = new Request(imageURL);
  //console.log("request", request);
  const res = await fetch(request);
  const blob = await res.blob();
  const { cid } = await node.add(blob);
  const ipfsImageURL = "https://ipfs.io/ipfs/" + cid.toString();
  //console.log("ipfsImageURL", ipfsImageURL);
  return { ipfs_image_url: ipfsImageURL };
};

export const ipfs_client = {
  create,
  init,
  createFromURL,
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
