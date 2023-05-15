import dbConnect from "../../../db/connect";
import App from "../../../db/models/App";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if(req.method === "POST") {
        try {
            const appData = req.body;
            const app = new App(appData);

            await app.save();
            res.status(201).json({ success: "App created successfully"});
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
}