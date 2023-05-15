// import dbConnect from "@/db/connect";
// import App from "@/db/models/App";

// export default async function handler(req, res) {
//     await dbConnect();

//     if(req.method === "POST") {
//         try {
//             const appData = req.body;
//             const app = new App(appData);

//             await app.save();
//             res.status(201).json({ success: "App created successfully"});
//         } catch (error) {
//             console.log(error);
//             res.status(400).json({ error: error.message });
//         }
//         // const { name, price, currency, startDate, endDate, renewPeriod } = req.body;
//         // const newApp = new App({
//         //     name,
//         //     price,
//         //     currency,
//         //     startDate,
//         //     endDate,
//         //     renewPeriod,
//         // });

//         // try {
//         //     const savedApp = await newApp.save();
//         //     res.json(savedApp);
//         // } catch (error) {
//         //     res.json({ message: error });
//         // }
//     }
// }