let config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export default async (req, res) => {
  const data = req.headers.data;

  console.log(data);

  // const response = await fetch(
  //   'https://reb00t.uc.r.appspot.com/profile/chuck-noris/availability',
  //   config
  // );
  // const data = await response.json();

  res.status(200).json({ msg: "okay" });
};
