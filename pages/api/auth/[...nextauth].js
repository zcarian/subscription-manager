import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongoose"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: "https://www.googleapis.com/auth/gmail.readonly",
    })
  ],
  callbacks: {
    async signIn(user, account, session) {
      user.user.apps = [];  
      console.log("user in signIn:", user);
      user.user.accessToken = user.account.access_token;
      // console.log("token:", user.account.access_token)
      // console.log("session in signIn:", session);
      // console.log("account in signIn:", account);
      // console.log("here",user.user);
      return true;
    },
    async session({session, user, token, account}) {
      session.user.id = user.id;
      session.user.accessToken = user.accessToken;
      // console.log("account in session:", account);
      // console.log("session in session:", session);
      // console.log("user in session:", user);
      // console.log("token in session:", token);
      return session
    },
    // async jwt(token, user, account, profile, isNewUser) {
      // console.log("account in jwt:", account);
      // console.log("user in jwt:", user);
      // console.log("token in jwt:", token);
      // return token;
    // }    
  },
  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)