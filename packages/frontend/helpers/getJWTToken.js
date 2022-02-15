import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

async function handler(req, res) {
  // if using `SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req, secret });
  //console.log("JSON Web Token", token);
  res.end();
}

export const getJWTToken = {
  handler,
};
