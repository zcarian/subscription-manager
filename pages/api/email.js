import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import emailData from "../../utils/emailData";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized123" });
    return;
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({
    refresh_token: session.user.refreshToken,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      q: "Potwierdzenie subskrypcji",
    });

    let appsFromEmails = [];

    if (response.data.messages) {
      for (let message of response.data.messages) {
        let messageData = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        let payload = messageData.data.payload;
        let parts = payload.parts;

        if (!parts) {
          continue;
        }

        emailData(parts, appsFromEmails);
      }

      // console.log("appsFromEmail:", appsFromEmails);
    }

    if (appsFromEmails.length) {
      res.status(200).json(appsFromEmails);
    } else {
      res.status(200).json({ message: "No subscription emails found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error scanning for subscription emails." });
  }
}
