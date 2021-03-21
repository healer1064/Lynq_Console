// let config = {
//   method: "GET",
//   headers: {
//     Accept: "*/*",
//     ContentType: "application/json",
//   },
// };

// export default async (req, res) => {
//   const token = req.headers.token;
//   console.log(token);

//   const response = await fetch(
//     `https://reb00t.uc.r.appspot.com/account/profile?t=${token}`,
//     config
//   );
//   const data = await response.json();

//   res.status(200).json(data);
// };
