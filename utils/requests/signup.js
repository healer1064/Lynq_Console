const postSignupReq = async (_data) => {
  const response = await fetch(`https://aks.lynq.app/legacy/account/signup`, {
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
