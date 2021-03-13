export default async (req, res) => {
  const _data = req.headers.data;

  const response = await fetch(
    `http://reb00t.uc.r.appspot.com/account/signup`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: _data,
    }
  );

  const data = await response.json();

  res.status(200).json(data);
};
