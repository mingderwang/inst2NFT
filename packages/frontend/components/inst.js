import useSWR from "swr";
import { useState, useEffect } from "react";
import { ipfs_client } from "../helpers";
import { useRecoilState } from "recoil";
import { connectState } from "../recoil/atoms";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Inst({ ...props }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data, error } = useSWR(`/api/get-media-list`, fetcher);
  const [connect] = useRecoilState(connectState);

  useEffect(() => {
    if (typeof inst !== "undefined" && inst.length === 0) {
      callback("3");
    }
  }, [data]);

  useEffect(() => {
    const initIPFS = async () => {
      await ipfs_client.init();
    };
    initIPFS();
  }, []);

  if (error) return <div>Failed to load. (You may sign in again.)</div>;
  if (!data) return <div>Loading...</div>;
  let inst = data;
  if (typeof inst === undefined || inst === undefined) {
    inst = [];
  }
  function callback(data) {
    //console.log("show Alert", data);
    switch (data) {
      case "4":
        setAlertMessage("Copy media to IPFS.");
        setShowAlert(true);
        break;
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
        setAlertMessage("NFT minting is canceled.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        break;
      case "0":
        setAlertMessage("Please, confirm in your wallet, or Metamask.");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 30000);
        break;
      default:
        console.log(`callback case error`);
    }
  }

  async function createInst(pin) {
    const { ipfs_image_url } = await ipfs_client.createFromURL(
      pin.media_url,
      callback
    );
    //console.log("ipfs_image_url", ipfs_image_url);
    const newPin = { ...pin, media_url: ipfs_image_url }; // newPin with ipfs image url
    const result = await ipfs_client.create(newPin, callback);
    return result;
  }

  const convertInst2NFT = async (pin) => {
    await createInst(pin);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-info shadow-lg">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <label>{alertMessage}</label>
          </div>
        </div>
      )}
      <div className="flex flex-wrap">
        {Object.keys(inst).map((key, i) => {
          const pin = inst[key];
          return (
            <div className="flex flex-nowrap" key={i}>
              <div className="card w-72 card-bordered card-compact lg:card-normal">
                <figure>
                  <img src={`${pin.media_url}`}></img>
                </figure>
                <div className="card-body">
                  <p>{pin.caption}</p>
                  <p>{pin.username}</p>
                  <p>{pin.timestamp}</p>
                  <div className="justify-end card-actions">
                    {!showAlert && connect && (
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
          );
        })}
      </div>
    </div>
  );
}
