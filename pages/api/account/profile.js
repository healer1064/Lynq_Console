let config = {
  method: "GET",
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
  },
};

export default async (req, res) => {
  const token = req.headers.token;
  console.log(token);

  const response = await fetch(
    `https://reb00t.uc.r.appspot.com/account/profile?t=${token}`,
    config
  );
  const data = await response.json();

  res.status(200).json(data);
};

// token
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzb21ld2ViLm9yZyIsImlkIjoiZjAxNzYzY2MtMjFkMS00OGY3LTlhMjEtYmIxMmEyN2RmZjIxIn0.iK-KZIO_kQcrei8Ablu3wpNDCLYObSp3qMSn9dFJ2ww
