const postSupportReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/support-request?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    }
  );

  return await response;
};

export { postSupportReq };
