import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
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
