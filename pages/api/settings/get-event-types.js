// let config = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     ContentType: "application/json",
//   },
// };

// export default async (req, res) => {
//   const token = req.headers.data;

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/event-type?t=${token}`,
//     config
//   );
//   const data = await response.json();

//   res.status(200).json(data);
// };

// let config = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     ContentType: "application/json",
//   },
// };

// export default async (req, res) => {
//   const token = req.headers.token;
//   console.log(token);

//   const response = await fetch(
//     `http://reb00t.uc.r.appspot.com/account/event-type?t=${token}`,
//     config
//   );
//   const data = await response.json();

//   res.status(200).json(data);
// };