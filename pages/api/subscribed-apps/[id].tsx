import dbConnect from "../../../db/connect";
import App from "../../../db/models/App";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { id } = req.query;
    
    if(req.method === "GET"){
        const app = await App.findById(id);

        if (!app) {
            return res.status(404).json({ status: 'Not found' });
        }

        return res.status(200).json(app);
    } else if (req.method==="DELETE"){  
        const appToDelete = await App.findByIdAndDelete(id);

        if (!appToDelete) {
            return res.status(404).json({ status: 'Not found' });
        }
        return res.status(200).json({ success: "App deleted successfully"});

        
    } else if (req.method === "PATCH") {
        const appToUpdate = await App.findByIdAndUpdate(id, {$set: req.body});

        if (!appToUpdate) {
            return res.status(404).json({ status: 'Not found' });
        }
        return res.status(200).json({ success: "App updated successfully"});
    }
}