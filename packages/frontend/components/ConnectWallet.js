// _app.js
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect, useReducer, useCallback } from "react";
import React from "react";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { providers } from "ethers";
import { useRecoilState } from "recoil";
import { connectState } from "../recoil/atoms";
import { getSettings, getChainById } from "../helpers";
import { setConfig } from "next/config";

const { INFURA_ID } = require("../.secret.json");

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

var web3Modal;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const [, setConnect2] = useRecoilState(connectState); // impact those convert to NFT buttons
  const [defaultNetwork, setDefaultNetwork] = useState("");
  const [onNetwork, setOnNetwork] = useState("");
  const [match, SetMatch] = useState(false);

  function setAndCheck(chainId) {
    const intChainId = parseInt(chainId, 16); // convert 0x3 to 3
    const currentNetwork = getChainById(intChainId);
    setOnNetwork(currentNetwork);
  }

  function setAndCheck2() {
    if (onNetwork === defaultNetwork) {
      SetMatch(true);
    } else {
      SetMatch(false);
    }
    setConnect2(match);
  }

  const setAndCheck3 = (a, b) => {
    const currentNetwork = getChainById(b);
    if (a !== "" && a === currentNetwork) {
      SetMatch(true);
      setConnect2(true);
    }
  };

  useEffect(() => {
    setAndCheck2();
  }, [onNetwork, defaultNetwork]);

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
      const currentNetwork = getChainById(network.chainId);
      if (currentNetwork) {
        setOnNetwork(currentNetwork);
      }
      setAndCheck3(currentNetwork, network.chainId); // include setConnect2(match)
    } catch (error) {
      console.error("web3Modal error", error);
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
      setConnect2(false); // impact those convert to NFT buttons
    },
    [provider]
  );

  useEffect(() => {
    setConnect2(match);
  }, [match]);

  useEffect(async () => {
    await connect();
    const { defaultNetwork } = await getSettings();
    setDefaultNetwork(defaultNetwork);
    if (typeof window?.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (_accounts) => {
        dispatch({
          type: "SET_ADDRESS",
          address: _accounts.length >= 1 ? _accounts[0] : "no account",
        });
      });
      window.ethereum.on("chainChanged", (_chainId) => {
        const intChainId = parseInt(_chainId, 16); // convert 0x3 to 3
        dispatch({
          type: "SET_CHAIN_ID",
          chainId: intChainId,
        });
        setAndCheck(_chainId);
      });
    }
  }, []);

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
      <div className="flex-initial w-100">
        {match && web3Provider && <p>✅ running on {onNetwork} network </p>}
        {!match && (
          <div>
            <p>
              {" "}
              {`❌ (Connect and switch your wallet to ${defaultNetwork} network.)`}
            </p>
          </div>
        )}
        {match && address && shortAddress && (
          <div className="grid">
            <div>
              <p>with account: {shortAddress(address, 6)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectWallet;
