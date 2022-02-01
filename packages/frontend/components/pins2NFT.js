import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default async function Pins2NFT({ ...props }) {
  const { data, error } = useSWR(
    `/api/pins2NFT/${props.user_address}`,
    fetcher
  );
  console.log("props.user_address", props.user_address);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const nfts = data;
  return (
    <div className="flex flex-wrap">
      {nfts
        .filter(
          (item) => item.from === "0x0000000000000000000000000000000000000000"
        )
        .map((nft, i) => (
          <div className="flex flex-nowrap">
            <div className="card w-72 card-bordered card-compact lg:card-normal">
              <div className="card-body">
                <p>xxx</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
