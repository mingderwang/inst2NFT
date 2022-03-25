// _app.js
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect, useReducer, useCallback } from "react";
import React from "react";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import { getChainData, getSettings } from "../helpers";

const { INFURA_ID } = require("../.secret.json");

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

var web3Modal;
var DEFAULT_NETWORK;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: DEFAULT_NETWORK, // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      window.$provider = action.provider;
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}
const shortAddress = (address, width) => {
  if (address.length === 42) {
    return address
      .slice(0, 2 + width)
      .concat("...".concat(address.slice(-width)));
  }
};

function ConnectWallet() {
  const [showAlert, setShowAlert] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const onlyNetwork = `(This App Only for ${DEFAULT_NETWORK})`;

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    try {
      provider = await web3Modal.connect();

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();
      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
    } catch (error) {
      console.log("web3Modal error", error);
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  useEffect(async () => {
    const { defaultNetwork } = await getSettings();
    DEFAULT_NETWORK = defaultNetwork;
    await connect();
  }, []);
  const chainData = getChainData(chainId);

  return (
    <div className="flex">
      <div className="flex-none w-36 h-14">
        {web3Provider ? (
          <button className="btn btn-accent" type="button" onClick={disconnect}>
            Disconnect
          </button>
        ) : (
          <button className="btn btn-secondary" type="button" onClick={connect}>
            Connect
          </button>
        )}
      </div>

      <div className="flex-initial w-64 ...">
        {address && (
          <div className="grid">
            <div>
              <p>{chainData?.name}</p> {onlyNetwork}
            </div>
            <div>
              <p>{shortAddress(address, 6)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectWallet;
