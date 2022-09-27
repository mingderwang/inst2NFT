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
    const pageId = item.id
    //console.log("item id:", pageId);
    //console.log("token", raw_token);
    const url = `https://graph.facebook.com/v15.0/${pageId}`; 
    const res = await superagent.get(url).query(
      { access_token: raw_token,
        fields: "instagram_business_account,name"
      });
    //console.log('functionThatReturnsAPromise: ' + res.statusCode)
    return Promise.resolve(await JSON.parse(res.text));
  };

  if (raw_token) {
    //console.log('facebook token->:'+raw_token)
    const url =
      "https://graph.facebook.com/v15.0/me";
    const url2 =
      "https://graph.facebook.com/v15.0/me/accounts?fields=name";

    const getUser = await superagent.get(url).query({
      access_token: raw_token,
    });
    const fbUser = JSON.parse(getUser.text);
    //console.log('FB_id->', fbUser.id)

    const getPages = await superagent.get(url2).query({
      access_token: raw_token,
    });
    const pages = JSON.parse(getPages.text);
    //console.log('Pages->', getPages.text)

    if (pages?.data) {
      const list = pages.data;
      const getData = async () => {
        return Promise.all(list.map((item) => doSomethingAsync(item)));
      };
      const result = await getData();
      const withIGAccountList = result.filter(e => e.instagram_business_account)

      res.status(200).json(withIGAccountList);
    } else {
      res.status(200).json({ error: "no media data" });
    }
  } else {
    res.status(200).json({ error: "no accessToken" });
  }
  res.end(); // remove res.end() in helper
}
