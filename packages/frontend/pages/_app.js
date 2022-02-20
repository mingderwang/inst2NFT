// _app.js
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import React from "react";
import ConnectWallet from "../components/ConnectWallet";
import "./styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <SessionProvider
        options={{
          staleTime: 0,
          refetchInterval: 0,
        }}
        session={pageProps.session}
      >
        <Layout>
          <ConnectWallet />
        </Layout>
        <Component {...pageProps} />
      </SessionProvider>
    </React.StrictMode>
  );
};

export default MyApp;
