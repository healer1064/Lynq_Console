const postSignupReq = async (_data) => {
  const response = await fetch(`https://api.lynq.app/account/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_data),
  });

  return await response.json();
};

export { postSignupReq };
