let config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export default async (req, res) => {
  const _data = JSON.parse(req.headers.data);

  const response = await fetch(
    `https://reb00t.uc.r.appspot.com/profile/${_data.slug}/availability?start=2020-10-20&end=2020-10-30&activity_id=${_data.id}`,
    config
  );
  const data = await response.json();

  res.status(200).json(data);
};
