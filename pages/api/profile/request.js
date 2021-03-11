export default async (req, res) => {
  const _data = JSON.parse(req.headers.data);
  //   config.body = JSON.stringify(_data.params);
  const test = {
    activity_id: "string",
    start_date: "string",
    first_name: "string",
    last_name: "string",
    email: "string",
  };

  let config = {
    method: "post",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
    body: test,
  };

  const response = await fetch(
    `http://reb00t.uc.r.appspot.com/profile/${_data.slug}/request`,
    config
  );

  const data = await response.json();

  res.status(200).json(data);
};
