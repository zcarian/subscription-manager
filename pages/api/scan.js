import { google } from 'googleapis';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import nextBase64 from 'next-base64';

export default async function handler(req, res) {

    const session = await getServerSession( req, res, authOptions );

    // console.log('Session from getSession:', session);
    // console.log('Access Token:', session.user.accessToken);


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
        refresh_token: session.user.refreshToken
      });
      
    //   console.log("oAuth2Client:", oAuth2Client)
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'Potwierdzenie subskrypcji'
        });
    
        let appsFromEmails = [];
    
        if (response.data.messages) {
    
            for (let message of response.data.messages) {
                let messageData = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id
                });
    
                let payload = messageData.data.payload;
                let parts = payload.parts;
    
                if (!parts) {
                    continue;
                }
    
                for (let part of parts) {
                    if (part.mimeType === "text/plain") {
                        let data = part.body.data;
                        let text = nextBase64.decode(data);
                        let lines = text.split('\n');
    
                        let searchStringFoName = "Aplikacja:";
                        let matchingLinesForName = lines.filter(line => line.includes(searchStringFoName)).filter(line => line.includes("treści:"));
    
                        let searchStringForBillingInfo = "Cena subskrypcji:";
                        let matchingLinesForBillingInfo = lines.filter(line => line.includes(searchStringForBillingInfo)).filter(line => line.includes("za"));
    
                        if (matchingLinesForName.length > 0 && matchingLinesForBillingInfo.length > 0) {
                            let matchForName = matchingLinesForName[0].match(/Aplikacja:(.*)-/);
                            let matchForPrice = matchingLinesForBillingInfo[0].match(/Cena subskrypcji:(.*)zł/);
                            let matchForStartDate = matchingLinesForBillingInfo[0].match(/początek:(.*)/);
                            let matchForRenewPeriod = matchingLinesForBillingInfo[0].match(/za (.*), po/);
    
                            let name = matchForName[1].trim();
                            let price = matchForPrice[1].trim();
                            let startDate = matchForStartDate[1].trim();
                            let renewPeriod = matchForRenewPeriod[1].trim();
    
                            if (renewPeriod === "miesiąc") renewPeriod = "monthly";
                            renewPeriod==="miesiąć" ? renewPeriod = "monthly" : (renewPeriod==="rok" ? renewPeriod = "yearly": renewPeriod);
    
                            let app = {
                                name: name,
                                price: price,
                                startDate: startDate,
                                renewPeriod: renewPeriod,
                                currency : "PLN",
                            }
    
                            appsFromEmails.push(app);
                        }
                    }
                }
            }
    
            console.log("appsFromEmail:", appsFromEmails);
        }
    
        if (appsFromEmails.length) {
            res.status(200).json(appsFromEmails);
        } else {
            res.status(200).json({ message: 'No subscription emails found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error scanning for subscription emails.' });
    }
    
}
