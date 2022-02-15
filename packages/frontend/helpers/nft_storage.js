import { toGatewayURL, NFTStorage, Blob } from "nft.storage";
const { NFT_STORAGE_KEY } = require("../.secret.json");
import { callContract } from "../helpers";

const create = async (JsonItem, callback) => {
  callback("0"); // start alter
  const apiKey = NFT_STORAGE_KEY;
  const client = new NFTStorage({ token: apiKey });
  const obj = {
    name: JsonItem.caption ? JsonItem.caption : "Unknown",
    description: JsonItem.caption ? JsonItem.caption : "",
    external_url: JsonItem.permalink,
    image: JsonItem.media_url,
    creater: JsonItem.username,
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
