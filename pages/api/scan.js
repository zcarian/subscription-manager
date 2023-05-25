import { google } from 'googleapis';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {

    const session = await getServerSession( req, res, authOptions );

    // console.log('Session from getSession:', session);
    console.log('Access Token:', session.user.accessToken);


    if (!session) {
        res.status(401).json({ message: 'Unauthorized123' });
        return;
    }
 
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URL
      );
    
      oAuth2Client.setCredentials({
        refresh_token: session.user.accessToken,
      });
      
      console.log("oAuth2Client:", oAuth2Client)
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'subject:subscription',
        });

        const messages = response.data.messages;
        if (messages.length) {
            res.status(200).json({ message: `Found ${messages.length} subscription emails.` });
        } else {
            res.status(200).json({ message: 'No subscription emails found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error scanning for subscription emails.' });
    }
}
