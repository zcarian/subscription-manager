import dbConnect from "../../../db/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../db/models/User";


export default async function handler(req, res) {
    await dbConnect();

    const session = await getServerSession( req, res, authOptions );

    const { id } = req.query;
    
    if(req.method === "GET"){
        const user = await User.findOne({ _id: session.user.id });
        const apps = user.apps;

        const app = apps.find((app) => app._id.toString() === id);

        if (!app) {
            return res.status(404).json({ status: 'Not found' });
        }

        return res.status(200).json(app);
    } else if (req.method==="DELETE"){  

        const user = await User.findOne({ _id: session.user.id });
        const apps = user.apps;

        const appToDelete = apps.find((app) => app._id.toString() === id);
        const index = apps.indexOf(appToDelete);
        apps.splice(index, 1);

        await user.save();

        if (!appToDelete) {
            return res.status(404).json({ status: 'Not found' });
        }

        return res.status(200).json({ success: "App updated successfully"});
    } else if (req.method === "PATCH") {

        const user = await User.findOne({ _id: session.user.id });
        const apps = user.apps;

        const appToUpdate = apps.find((app) => app._id.toString() === id);
        const index = apps.indexOf(appToUpdate);
        apps[index] = req.body;

        await user.save();

        if (!appToUpdate) {
            return res.status(404).json({ status: 'Not found' });
        }
        return res.status(200).json({ success: "App updated successfully"});
    }
}