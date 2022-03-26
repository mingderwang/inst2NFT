import { getToken } from "next-auth/jwt";
const secret = process.env.SECRET;

async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (token) {
    return token.accessToken;
  } else {
    return null;
  }
}

export const getJWTToken = {
  handler,
};
