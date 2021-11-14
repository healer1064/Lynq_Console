const getClientsReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://aks.lynq.app/legacy/account/clients?t=${_token}`,
    config,
  );
  return await response.json();
};

const getStatsReq = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://aks.lynq.app/legacy/stats?t=${_token}`,
    config,
  );

  return await response.json();
};

export { getClientsReq, getStatsReq };
