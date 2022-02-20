import { useSession } from "next-auth/react";
import Inst from "../components/inst";

function Index({ nft_storage_key }) {
  const { data: session, status } = useSession();

  return (
    <>
      {session && (
        <>
          <div>
            <Inst user_id={session} nft_storage_key={nft_storage_key}></Inst>
          </div>
        </>
      )}
    </>
  );
}

Index.getInitialProps = () => {
  return { nft_storage_key: process.env.NFT_STORAGE_KEY };
};

export default Index;
