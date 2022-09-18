// This is an example of how to read a JSON Web Token from an API route
import { redirect } from "next/dist/server/api-utils";
import { getJWTToken } from "../../helpers/getJWTToken";
const superagent = require("superagent");

export default async function handler(req, res) {
  const raw_token = await getJWTToken.handler(req, res);

  const doSomethingAsync = async (item) => {
    return functionThatReturnsAPromise(item);
  };

  const doSomethingAsync2 = async (item) => {
    return functionThatReturnsAPromise2(item);
  };

  const functionThatReturnsAPromise = async (item) => {
    //a function that returns a promise
    // show following on server side.
    const pageId = item.id
    //console.log("token", raw_token);
    const url = `https://graph.facebook.com/v15.0/${pageId}`; 
    const res = await superagent.get(url).query(
      { access_token: raw_token,
        fields: "instagram_business_account,name"
      });
    return Promise.resolve(await JSON.parse(res.text));
  };

  const functionThatReturnsAPromise2 = async (mediaId) => {
    const url = `https://graph.facebook.com/v15.0/${mediaId}`; 
    const res = await superagent.get(url).query(
      { access_token: raw_token,
        fields: "ig_id,media_url"
      });
 
    return Promise.resolve(await JSON.parse(res.text));
  }

  if (raw_token) {
    // console.log('facebook token->:'+raw_token)
    const url =
      "https://graph.facebook.com/v15.0/me";
    const url2 =
      "https://graph.facebook.com/v15.0/me/accounts?fields=name";

    const getUser = await superagent.get(url).query({
      access_token: raw_token,
    });
    const fbUser = JSON.parse(getUser.text);
    // console.log('FB_id->', fbUser.id)

    const getPages = await superagent.get(url2).query({
      access_token: raw_token,
    });
    const pages = JSON.parse(getPages.text);
    // console.log('Pages->', getPages.text)

    if (pages?.data) {
      const list = pages.data;
      const getData = async () => {
        return Promise.all(list.map((item) => doSomethingAsync(item)));
      };
      const result = await getData();
      const withIGAccountList = result.filter(e => e.instagram_business_account)
      const ig_user_id = withIGAccountList[0].instagram_business_account.id

      const getMedia = await superagent.get(`https://graph.facebook.com/v15.0/${ig_user_id}/media`).query({
        access_token: raw_token,
      });

      const media = JSON.parse(getMedia.text);
      const ids = media.data.map((e)=>e.id)
      const getData2 = async () => {
        return Promise.all(ids.map((item) => doSomethingAsync2(item)));
      };

      const result2 = await getData2()
      res.status(200).json(result2);
    } else {
      res.status(200).json({ error: "no media data" });
    }
  } else {
    res.status(200).json({ error: "no accessToken" });
  }
  res.end(); // remove res.end() in helper
}
