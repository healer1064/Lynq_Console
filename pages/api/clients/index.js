// let config = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     ContentType: "application/json",
//   },
// };

// export default async (req, res) => {
//   const token = req.headers;

//   console.log("token", token);

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/clients?t=${token}`,
//     config
//   );
//   const data = await response.json();

//   res.status(200).json(data);
// };
