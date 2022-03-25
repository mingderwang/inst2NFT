import { useState, useEffect } from "react";
import * as IPFS from "ipfs-core";

const IpfsComponent = () => {
  const [id, setId] = useState(null);
  const [ipfs, setIpfs] = useState(null);
  const [version, setVersion] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (ipfs) return;

      const node = await IPFS.create();

      const nodeId = await node.id();
      const nodeVersion = await node.version();
      const nodeIsOnline = node.isOnline;

      const obj = {
        name: "ming",
        created_with: "https://inst.2nft.me/",
      };
      const metadata = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });

      const { cid } = await node.add(metadata);
      console.info("https://ipfs.io/ipfs/" + cid.toString());

      setIpfs(node);
      setId(nodeId.id);
      setVersion(nodeVersion.version);
      setIsOnline(nodeIsOnline);
    };

    init();
  }, [ipfs]);

  if (!ipfs) {
    return <h4>Connecting to IPFS...</h4>;
  }

  return (
    <div>
      <h4 data-test="id">ID: {id}</h4>
      <h4 data-test="version">Version: {version}</h4>
      <h4 data-test="status">Status: {isOnline ? "Online" : "Offline"}</h4>
    </div>
  );
};

export default IpfsComponent;
