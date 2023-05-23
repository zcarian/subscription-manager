import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongoose"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(user) {
      // console.log("signed in");
      // console.log(user.user);
        user.user.apps = [];  
      return true;
    },
    async session({session, user}) {
      session.user.id = user.id;
      return session
    }
  },
}
export default NextAuth(authOptions)