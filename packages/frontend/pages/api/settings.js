import config from "../../inst2nft.config";
export default function handler(req, res) {
  res.status(200).json(config);
}
