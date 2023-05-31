import dbConnect from "../../../db/connect";
import App from "../../../db/models/App";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../db/models/User";

export default async function handler(req, res) {
    await dbConnect();

    const session = await getServerSession( req, res, authOptions );

    if(!session){
        return res.status(401).json({error: "You are not logged in"});
    }


    if (req.method === "POST") {
        try {
            const appData = req.body;
            console.log("appData", appData);
            const user = await User.findOne({ _id: session.user.id })
          
            for(let app of appData.emailData){
                let newApp = new App(app);
                user.apps.push(newApp);
            }

            await user.save();
  
            res.status(201).json({ success: "App created successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}