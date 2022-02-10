import NextAuth from "next-auth";
const request = require("superagent");

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
          console.log("response ====", response);
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
        url: "https://graph.instagram.com/me?fields=id, username, account_type, media_count, media",
        async request({ client, tokens }) {
          // Get base profile
          console.log("userinfo.client", client);
          console.log("userinfo.tokens", tokens);
          const profile = await client.userinfo(tokens);
          // no email info from Pinterest API
          if (!profile.email) {
            profile.email = profile.username;
          }
          const url = `https://graph.facebook.com/instagram/picture?redirect=false`;
          const res = await request.get(url);
          profile.image = JSON.parse(res.text).data.url;
          profile.media.data.map(console.log);
          return profile;
        },
      },
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,

      profile(profile, accessToken) {
        console.log("profile.token", accessToken);
        console.log("profile.profile", profile);
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image,
          account_type: profile.account_type,
          media_count: profile.media_count,
          media: profile.media.data,
        };
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

  jwt: {},

  pages: {},

  callbacks: {},

  events: {},

  theme: {
    colorScheme: "light",
  },

  debug: false,
});
