// _app.js
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { connectMetamask } from "../helpers";
import Layout from "../components/layout";
import "./styles/globals.css";
import React from "react";
import { RecoilRoot } from "recoil";
const { DEFAULT_NETWORK, BANNER } = require("../.secret.json");

const MyApp = ({ Component, pageProps }) => {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [address, setAddress] = useState("");
  const [connectted, setConnectted] = useState(false);
  const [, setNetwork] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  function accountChanged(_accounts) {
    // Time to reload your interface with accounts[0]!
    setAddress(_accounts.length >= 1 ? _accounts[0] : "no account");
  }

  function networkChanged(_chainId) {
    // Time to reload your interface with the new networkId
    setNetwork(_chainId);
    setCorrectNetwork(_chainId === DEFAULT_NETWORK ? true : false);
  }

  function disconnected(_chainId) {
    // Time to reload your interface with the new networkId
    setNetwork("");
    setAddress("");
    setCorrectNetwork(false);
  }

  const connect = async () => {
    const { address, network } = await connectMetamask(
      accountChanged,
      networkChanged,
      disconnected
    );

    if (address === "no metamask") {
      setHasMetamask(false);
    }
    if (address === "no account" || address === "no metamask") {
    } else {
      setNetwork(network);
      setAddress(address);
      setConnectted(true);
      setHasMetamask(true);
    }
    setCorrectNetwork(network === DEFAULT_NETWORK ? true : false);
    if (correctNetwork) {
      console.log("......correct network", network);
    }
  };

  const shortAddress = (address) => {
    if (address.length === 42) {
      return address.slice(0, 6).concat("...".concat(address.slice(-4)));
    }
  };

  useEffect(async () => {
    await connect();
  }, []);

  return (
    <>
      <React.StrictMode>
        <RecoilRoot>
          <SessionProvider
            options={{
              staleTime: 0,
              refetchInterval: 0,
            }}
            session={pageProps.session}
          >
            <Layout>
              <div>
                {!correctNetwork && `🦋 ${BANNER} 🚀`}
                {!connectted && hasMetamask && (
                  <div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={connect}
                    >
                      connect
                    </button>
                  </div>
                )}

                {connectted && correctNetwork && (
                  <div>
                    <p>{shortAddress(address)}</p>
                  </div>
                )}

                {!hasMetamask && (
                  <>
                    <a
                      href="/components/modal#my-modal"
                      className="btn btn-primary"
                    >
                      connect
                    </a>
                    <div id="my-modal" className="modal">
                      <div className="modal-box">
                        <p>Please install Metamask (Wallet) first.</p>
                        <div className="modal-action">
                          <a
                            href="https://metamask.io/"
                            className="btn btn-primary"
                          >
                            Metamask Home Page
                          </a>
                          <a href="/" className="btn">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Layout>
            <Component {...pageProps} />
          </SessionProvider>
        </RecoilRoot>
      </React.StrictMode>
    </>
  );
};

export default MyApp;
