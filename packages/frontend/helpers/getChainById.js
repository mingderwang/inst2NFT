export function getChainById(id) {
  var networkName;
  switch (id) {
    case 4:
      networkName = "rinkeby";
      break;
    case 137:
      networkName = "polygon";
      break;
    default:
      networkName = "";
  }
  //console.log("networkName", networkName);
  return networkName;
}
