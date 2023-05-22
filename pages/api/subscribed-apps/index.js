import dbConnect from "../../../db/connect";
import App from "../../../db/models/App";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../db/models/User";
export default async function handler(req, res) {
    await dbConnect();

    const session = await getServerSession( req, res, authOptions );

    // console.log("session in api/subscribed-apps/index.js", session);

    if(!session){
        return res.status(401).json({error: "You are not logged in"});
    }


    if(req.method === "GET"){
        const user = await User.find({ email: session.user.email });
        return res.status(200).json(user);
        
    } else if (req.method === "POST") {
      try {
          const appData = req.body;
          const app = new App(appData);
          
          const user = await User.findOneAndUpdate({ email: session.user.email })

          await app.save();

          user.apps.push(app);

          await user.save();


  
          // const session = await getSession({ req });
        

  
          res.status(201).json({ success: "App created successfully" });
      } catch (error) {
          console.log(error);
          res.status(400).json({ error: error.message });
      }
  }
}