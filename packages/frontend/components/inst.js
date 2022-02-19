import useSWR from "swr";
import { useState, useEffect } from "react";
import { nft_storage } from "../helpers";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Inst({ ...props }) {
  //console.log("Inst.progs ------>   ", props.user_id.profile);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data, error } = useSWR(`/api/auth/session`, fetcher);

  useEffect(() => {
    if (typeof inst !== "undefined" && inst.length === 0) {
      callback("3");
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  let inst = data.profile?.mediaUrlArray;
  if (typeof inst === undefined || inst === undefined) {
    inst = [];
  }
  function callback(data) {
    //console.log("show Alert", data);
    switch (data) {
      case "3":
        setAlertMessage("No media posted in your Instagram account.");
        setShowAlert(true);
        break;
      case "1":
        setAlertMessage("NFT is generated successfully. View it on OpenSea");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        break;
      case "2":
        setAlertMessage("NFT Minting is canceled.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        break;
      case "0":
        setAlertMessage("Please, confirm in your Metamask.");
        setShowAlert(true);
        break;
      default:
        console.log(`callback case error`);
    }
  }

  function jsony(a) {
    return Object.entries(a)
      .map(([k, v]) => `${k}: ${v}`) // stringfy an json object a
      .join(`,\n `);
  }

  async function createInst(pin) {
    const result = await nft_storage.create(pin, callback);
    return result;
  }

  const convertInst2NFT = async (pin) => {
    await createInst(pin);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-info">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <label>{alertMessage}</label>
          </div>
        </div>
      )}
      <div className="flex flex-wrap">
        {inst.map((pin, i) => (
          <div className="flex flex-nowrap">
            <div className="card w-72 card-bordered card-compact lg:card-normal">
              <figure>
                <img src={`${pin.media_url}`}></img>
              </figure>
              <div className="card-body">
                <p>{pin.caption}</p>
                <p>{pin.username}</p>
                <p>{pin.timestamp}</p>
                <div className="justify-end card-actions">
                  {!showAlert && (
                    <button
                      type="button"
                      onClick={() => {
                        convertInst2NFT(pin);
                      }}
                      className="btn btn-secondary"
                    >
                      convert to NFT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
