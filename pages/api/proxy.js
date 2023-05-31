// import fetch from 'isomorphic-unfetch';

// export default async (req, res) => {
//   const { searchTerm } = req.query;

//   try {
//     const response = await fetch(
//       `https://play.google.com/store/search?q=${encodeURIComponent(
//         searchTerm
//       )}&c=apps`
//     );

//     if (!response.ok) {
//       throw new Error('Error fetching app data in proxy, no response');
//     }

//     const html = await response.text();
//     res.status(200).send(html);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching app data in proxy');
//   }
// };
