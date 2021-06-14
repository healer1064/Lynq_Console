const getBusinessReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://api.lynq.app/account/business?t=${_token}`,
    config
  );

  return await response.json();
};

export { getBusinessReq };
