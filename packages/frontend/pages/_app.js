// _app.js
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import React, { useState, useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet";
import "./styles/globals.css";
import { RecoilRoot } from "recoil";
// import IpfsComponent from "../components/ipfs"; //      <IpfsComponent></IpfsComponent>

const MyApp = ({ Component, pageProps }) => {
  const [gdpr, setGdpr] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentCookies = localStorage.getItem("acceptCookies");
      switch (currentCookies) {
        case "accepted":
          setGdpr(false);
          break;
        default:
          console.log(`you need to accept for using this app`);
      }
    }
  }, []);

  const onAccept = () => {
    setGdpr(false);
    localStorage.setItem("acceptCookies", "accepted");
  };
  return (
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
            <ConnectWallet />
            {gdpr && (
              <div className="alert alert-info shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info flex-shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    This website uses cookies to improve your user experience.
                  </span>
                </div>
                <div className="flex-none">
                  <button className="btn btn-sm btn-primary" onClick={onAccept}>
                    Got It
                  </button>
                </div>
              </div>
            )}
          </Layout>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
};

export default MyApp;
