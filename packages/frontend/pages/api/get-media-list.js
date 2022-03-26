// This is an example of how to read a JSON Web Token from an API route
import { redirect } from "next/dist/server/api-utils";
import { getJWTToken } from "../../helpers/getJWTToken";
const superagent = require("superagent");

export default async function handler(req, res) {
  const raw_token = await getJWTToken.handler(req, res);

  const doSomethingAsync = async (item) => {
    return functionThatReturnsAPromise(item);
  };

  const functionThatReturnsAPromise = async (item) => {
    //a function that returns a promise
    // show following on server side.
    //console.log("item:", item);
    //console.log("token", raw_token);
    const url = `https://graph.instagram.com/${item.id}/?fields=media_url,caption,permalink,username,timestamp,media_type`;
    const res = await superagent.get(url).query({ access_token: raw_token });
    return Promise.resolve(await JSON.parse(res.text));
  };

  if (raw_token) {
    const url =
      "https://graph.instagram.com/me?fields=id, username, account_type, media";

    const x = await superagent.get(url).query({
      access_token: raw_token,
    });

    const imageURL = JSON.parse(x.text);

    if (imageURL?.media) {
      const list = imageURL.media.data;
      const getData = async () => {
        return Promise.all(list.map((item) => doSomethingAsync(item)));
      };
      const result = await getData();

      res.status(200).json(result);
    } else {
      res.status(200).json({ error: "no media data" });
    }
  } else {
    res.status(200).json({ error: "no accessToken" });
  }
  res.end(); // remove res.end() in helper
}
