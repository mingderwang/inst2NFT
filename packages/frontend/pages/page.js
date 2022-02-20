function Page({ stars }) {
  console.log("xxx stars", stars);
  return <div>Next stars: {stars}</div>;
}

Page.getInitialProps = async (ctx) => {
  console.log("ConnectWallet.getIntialProps", process.env.SECRET);
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: process.env.SECRET };
};

export default Page;
