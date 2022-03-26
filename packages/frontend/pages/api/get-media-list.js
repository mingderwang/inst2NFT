// This is an example of how to read a JSON Web Token from an API route
import { redirect } from "next/dist/server/api-utils";
import { getJWTToken } from "../../helpers/getJWTToken";
const superagent = require("superagent");

const functionThatReturnsAPromise = async (item) => {
  //a function that returns a promise
  //console.log("item:", item);
  //console.log(tokens.access_token);
  const url = `https://graph.instagram.com/${item.id}/?fields=media_url,caption,permalink,username,timestamp,media_type`;
  const res = await superagent
    .get(url)
    .query({ access_token: tokens.access_token });
  //console.log("res", res.text);
  return Promise.resolve(await JSON.parse(res.text));
};

const doSomethingAsync = async (item) => {
  return functionThatReturnsAPromise(item);
};

export default async function handler(req, res) {
  const raw_token = await getJWTToken.handler(req, res);

  if (raw_token) {
    const url =
      "https://graph.instagram.com/me?fields=id, username, account_type, media";

    const x = await superagent.get(url).query({
      access_token: raw_token,
    });

    const imageURL = JSON.parse(x.text);
    if (imageURL?.media) {
      res.status(200).json({ success: true, data: imageURL.media.data });
    } else {
      res.status(200).json({ success: false, data: "no media data" });
    }
  } else {
    res.status(200).json({ success: false, data: "no accessToken" });
  }
  res.end(); // remove res.end() in helper
}
