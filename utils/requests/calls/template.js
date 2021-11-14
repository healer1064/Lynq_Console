const listingPriceReq = async (_token, _price) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/simulate?t=${_token}&price=${_price}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
};

const postOneToOneOptionReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/event-type?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response;
};

const getOneToOneOptionReq = async (_token) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/event-type?t=${_token}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  return await response;
};

const putOneToOneOptionReq = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/event-type/${_id}?t=${_token}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response;
};

export {
  listingPriceReq,
  postOneToOneOptionReq,
  getOneToOneOptionReq,
  putOneToOneOptionReq,
};
