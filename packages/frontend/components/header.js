import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import { getOpenseaURL } from "../helpers";
import { useEffect, useState } from "react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const [openseaURL, setOpenseaURL] = useState("/");
  const loading = status === "loading";

  useEffect(async () => {
    const { openseaurl } = await getOpenseaURL();
    setOpenseaURL(openseaurl);
  }, []);

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in Instagram or Facebook yet.
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {console.log(session)}
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="flex-none px-2 mx-2">
          <div className="items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Inst2NFT</a>
            </Link>
          </div>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="items-stretch">
            <Link href={openseaURL}>
              <a className="btn btn-ghost btn-sm rounded-btn">
                View On OpenSea
              </a>
            </Link>
          </div>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="items-stretch">
            <Link href="/terms-of-service">
              <a className="btn btn-ghost btn-sm rounded-btn">Terms of use</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
