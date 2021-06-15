const postResetPassReq = async (_code, _password) => {
  const response = await fetch(
    `https://api.lynq.app/account/reset-password/${_code}?new_password=${_password}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await response;
};

export { postResetPassReq };
