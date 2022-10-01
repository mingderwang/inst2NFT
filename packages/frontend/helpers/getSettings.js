export async function getSettings() {
  const result = await fetch(`/api/settings`).then((res) => res.json());
  return result;
}

export async function getOpenseaURL() {
  const { defaultNetwork, networks } = await getSettings();
  const currentNetwork = networks[defaultNetwork];
  return { openseaurl: currentNetwork.openseaURL };
}

export async function getContractAddress() {
  const { defaultNetwork, networks } = await getSettings();
  const currentNetwork = networks[defaultNetwork];
  return { contractaddress: currentNetwork.contractAddress };
}
