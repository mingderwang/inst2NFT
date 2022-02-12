import useSWR from "swr";
import { useSession } from "next-auth/react";
import Inst from "../components/inst";

export default function Index(pageProps) {
  const { data: session, status } = useSession();
  return (
    <>
      {session && (
        <>
          <div>
            <Inst user_id={session}></Inst>
          </div>
        </>
      )}
    </>
  );
}
