import { useSession } from "next-auth/react";
import Inst from "../components/inst";

function Index() {
  const { data: session, status } = useSession();
  return (
    <>
      {session && (
        <>
          <div>
            <Inst session={session}></Inst>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
