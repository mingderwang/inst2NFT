export default function Privacy() {
  return (
    <section className="relative py-16 bg-white min-w-screen animation-fade animation-delay">
      <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
        <p className="text-xs font-bold text-left text-pink-500 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
          We don't collect your data! And keep your privacy secure as possible.
        </p>
        <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
          Security & Privacy
        </h3>
        <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            How does it work?
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            We need you to appove on login Instagram or Facebook to get the
            contents of your posted only. The reason we need you to connect with
            a digital wallet, Metamask, is because we need to know your account
            address and need you to accept the tokens minting when you convert
            your posted media to NFTs.
          </p>
        </div>
        <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            Why we use cookies?
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            For using Facebook or Instagram accounts to use our app, we need
            your login session and save the access tokens in your local browser
            as cookies. We don't use cookies for any other purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
