// export default async (req, res) => {
//   const _data = JSON.parse(req.headers.data);

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/event-type/${_data._reqData.id}?t=${_data.token}`,
//     {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(_data._reqData),
//     }
//   );

//   const data = await response.json();

//   res.status(200).json(data);
// };
