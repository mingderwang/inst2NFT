import { getProviders, getSession, signIn } from "next-auth/react";
import styles from "./styles/Signin.module.css";

export default function SignIn({ providers }) {
  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider) => (
        <div className={styles.container} key={provider.name}>
          <button className={styles.button} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers, noLayout: true },
  };
}
