// export default async (req, res) => {
//   const _data = JSON.parse(req.headers.data);

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/public-profile/upload_picture?t=${_data.token}`,
//     {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(_data.image),
//     }
//   );

//   const data = await response.json();
//   // const data = await response.json();

//   res.status(200).json(data);
// };
