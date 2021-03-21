// export default async (req, res) => {
//   const token = req.headers.token;

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/balance/request_payment?t=${token}`,
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   res.status(200).json(data);
// };
