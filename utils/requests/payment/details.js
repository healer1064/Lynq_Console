const getDetailsReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://api.lynq.app/account/clients?t=${_token}&period=TODAY`,
    config
  );
  return await response.json();
};

export { getDetailsReq };
