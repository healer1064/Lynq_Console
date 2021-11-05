const getProfileReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "*/*",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://aks.lynq.app/legacy/account/profile?t=${_token}`,
    config
  );

  return await response.json();
};

const postProfileReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/profile?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    }
  );

  return await response;
};

const getBusinessReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://aks.lynq.app/payments/finance-details?t=${_token}`,
    config
  );

  return await response.json();
};

const postBusinessReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/payments/finance-details?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    }
  );

  return await response;
};

const postPassChangeReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/new-password?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    }
  );

  return await response;
};

export {
  getProfileReq,
  postProfileReq,
  getBusinessReq,
  postBusinessReq,
  postPassChangeReq,
};
