// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export default async (req, res) => {
  const slug = req.headers.data;

  const response = await fetch(
    `https://reb00t.uc.r.appspot.com/profile/${slug}`,
    config
  );
  const data = await response.json();

  res.status(200).json(data);
};
