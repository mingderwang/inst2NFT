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
    const url = "https://graph.facebook.com/v15.0/me"; 
    const res = await superagent.get(url).query({ access_token: raw_token });
    console.log('functionThatReturnsAPromise' + res.statusCode)
    return Promise.resolve(await JSON.parse(res.text));
  };

  if (raw_token) {
    console.log('facebook token->:'+raw_token)
    const url =
      "https://graph.facebook.com/v15.0/me";

    const x = await superagent.get(url).query({
      access_token: raw_token,
    });
    const user = JSON.parse(x.text);
    console.log('FB_id->', user.id)
    res.status(200).json(user)
  } else {
    res.status(500).json({ error: "no accessToken" });
  }
  res.end(); // remove res.end() in helper
}
