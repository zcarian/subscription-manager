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
    }
}