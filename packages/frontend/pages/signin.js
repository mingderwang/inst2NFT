import { getProviders, getSession, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <>
      <section className="container mx-auto flex items-center justify-around">
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4">
            {Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                className={
                  provider.name === "Instagram"
                    ? "btn btn-secondary btn-lg"
                    : "btn btn-primary btn-lg"
                }
                onClick={() => signIn(provider.id)}
              >
                <img
                  className="inline-block w-12 h-12 mr-2 stroke-current"
                  src={
                    provider.name === "Instagram"
                      ? "/Instagram_Glyph_Gradient_RGB.svg"
                      : "/FB-RGB-Wht.svg"
                  }
                ></img>
                Continue with {provider.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
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
