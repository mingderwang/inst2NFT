export default function DeleteUserData() {
  return (
    <section className="relative py-16 bg-white min-w-screen animation-fade animation-delay">
      <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
        <p className="text-xs font-bold text-left text-pink-500 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
          We don't collect your data!
        </p>
        <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
          User Data Policy
        </h3>
        <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            How to delete your data?
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            You have some cookies for login Instagram are located on your
            browser. We don't have any data from your local side and not collect
            any of your personal information on the server side.
          </p>
        </div>
        <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            How to remove your posted media from NFTs?
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            Sorry, you can't. NFT is a kind of token which registers itself on
            blockchains. And it stores its metadata on IPFS, which is a
            permanent storage, no one can mutate it. So, there is no way to
            remove your post from NFTs.
          </p>
        </div>
        <div className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            Who owns the NFT when it had been created?
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            The simple answer is you. The NFT owner is the person who created
            it. But the media it was linked to may or may not belong to the same
            person. It depends on who owns the copyrights and/or who creates the
            original contents. Because you are the owner of these NFT tokens if
            you convert and mint them. Then, you can trade them on NFT
            marketplaces or transfer directly to anybody if you want.
          </p>
        </div>
      </div>
    </section>
  );
}
