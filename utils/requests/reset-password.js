const postResetPassReq = async (_code, _password) => {
  const _reqData = { newPassword: _password };
  const response = await fetch(
    `https://api.lynq.app/account/reset-password/${_code}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response;
};

export { postResetPassReq };
