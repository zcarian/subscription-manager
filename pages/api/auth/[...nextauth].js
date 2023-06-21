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
      authorization: {
        params: {
          scope: "openid https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })  
  ],
  callbacks: {
    async signIn(user, account, session) {
      user.user.apps = [];  
      user.user.accessToken = user.account.access_token;
      user.user.refreshToken = user.account.refresh_token;
      // console.log("user in signIn:", user);
      // console.log("token:", user.account.access_token)
      // console.log("session in signIn:", session);
      // console.log("account in signIn:", account);
      return true;
    },
    async session({session, user, token, account}) {
      session.user.id = user.id;
      session.user.accessToken = user.accessToken; 
      session.user.refreshToken = user.refreshToken;
      // console.log("account in session:", account);
      // console.log("session in session:", session);
      // console.log("user in session:", user);
      // console.log("token in session:", token);
      return session
    },  
  },
  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)