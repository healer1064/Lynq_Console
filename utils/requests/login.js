const postSigninReq = async (_reqData) => {
  const response = await fetch(`https://api.lynq.app/account/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_reqData),
  });
  return await response.json();
};

export { postSigninReq };
