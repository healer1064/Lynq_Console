const getRequestReq = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/appointments/requests?t=${_token}`,
    config,
  );
  return await response.json();
};

const postAcceptReq = async (_token, _id) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/appointments/${_id}/accept?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return await response;
};

const postRejectReq = async (_token, _id) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/appointments/${_id}/cancel?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return await response;
};

export { getRequestReq, postAcceptReq, postRejectReq };
