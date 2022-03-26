import NextAuth from "next-auth";
const superagent = require("superagent");

export default NextAuth({
  providers: [
    {
      id: "instagram",
      name: "instagram",
      type: "oauth",
      version: "2.0",
      token: {
        url: "https://api.instagram.com/oauth/access_token",
        async request({ client, params, checks, provider }) {
          const response = await client.oauthCallback(
            provider.callbackUrl,
            params,
            checks,
            {
              exchangeBody: {
                client_id: client.client_id,
                client_secret: client.client_secret,
              },
            }
          );
          //console.log("response ====", response);
          return { tokens: response };
        },
      },
      authorization: {
        url: "https://api.instagram.com/oauth/authorize",
        params: {
          scope: "user_profile",
        },
      },
      userinfo: {
        url: "https://graph.instagram.com/me?fields=id, username, account_type, media",
        async request({ client, tokens }) {
          // Get base profile
          //console.log("userinfo.client", client);
          //console.log("userinfo.tokens", tokens);
          const profile = await client.userinfo(tokens);
          // no email info from Pinterest API
          if (!profile.email) {
            profile.email = profile.username;
          }
          const url = `https://graph.facebook.com/instagram/picture?redirect=false`;
          const res = await superagent.get(url);
          profile.image = JSON.parse(res.text).data.url;
          //console.log("profile", profile);
          if (typeof profile.media === "undefined") {
            profile.mediaUrlArray = [];
          } else {
            //console.log("profile.media !== undefined");
            const list = profile.media.data;

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

            const getData = async () => {
              return Promise.all(list.map((item) => doSomethingAsync(item)));
            };

            profile.mediaUrlArray = await getData();
          }
          return profile;
        },
      },
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,

      profile(profile, accessToken) {
        //console.log("profile.token", accessToken);
        //console.log("profile.profile", profile);
        if (typeof profile.media === "undefined") {
          return {
            id: profile.id,
            name: profile.username,
            email: profile.email,
            image: profile.image,
            account_type: profile.account_type,
          };
        } else {
          return {
            id: profile.id,
            name: profile.username,
            email: profile.email,
            image: profile.image,
            account_type: profile.account_type,
            media: profile.media.data,
          };
        }
      },
      checks: "none",
      headers: {},
      authorizationParams: {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        redirect_uri: encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI),
      },
    },
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },

  jwt: {
    maxAge: 1 * 24 * 60 * 60, // 1 days
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    // maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
  },

  pages: {},

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session && token?.profile) {
        session.profile = token.profile;
      }
      //  console.log("session", session);
      if (!session?.user || !token?.account) {
        return session;
      }

      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;

      return session;
    },
  },

  events: {},

  theme: {
    colorScheme: "light",
  },

  debug: false,
});
