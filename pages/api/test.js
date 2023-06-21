// const gplay = require('google-play-scraper');
// const store = require('app-store-scraper');

// export default async (req, res) => {
//     const { term, num } = req.query;

//     try {
//         const results = await store.search({ term, num: parseInt(num, 10) });
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({ error: error.toString() });
//     }
// };
