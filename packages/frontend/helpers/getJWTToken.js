import { getToken } from "next-auth/jwt";

async function handler(req, _) {
  const secret = process.env.SECRET;
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
