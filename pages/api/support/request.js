export default async (req, res) => {
  // const _data = req.headers.data;

  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzb21ld2ViLm9yZyIsImlkIjoiZjAxNzYzY2MtMjFkMS00OGY3LTlhMjEtYmIxMmEyN2RmZjIxIn0.iK-KZIO_kQcrei8Ablu3wpNDCLYObSp3qMSn9dFJ2ww";

  // const message = "test";

  // const response = await fetch(
  //   `http://reb00t.uc.r.appspot.com/account/support-request?t=${token}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: { message: "test" },
  //   }
  // );

  // const data = await response.json();
  // console.log(data);
  res.status(200).json({ msg: "awesome" });
};
