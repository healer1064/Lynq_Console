export const postMasterclass = async (_token, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/feat/masterclass?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    },
  );
  return await response.json();
};

export const putMasterclass = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/feat/masterclass/${_id}?t=${_token}`,
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

export const getMasterclass = async (_token) => {
  const response = await fetch(
    `https://api.lynq.app/feat/masterclass?t=${_token}`,
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

export const deleteMasterclass = async (_token, _id) => {
  const response = await fetch(
    `https://api.lynq.app/feat/masterclass/${_id}?t=${_token}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  return await response;
};

export const getMasterclassSlots = async (_token, _date, _id) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  const response = await fetch(
    `https://api.lynq.app/account/public-profile/availability?t=${_token}&start=${moment(
      _date,
    ).format("yyyy-MM-DD")}&end=${moment(_date)
      .add(5, "days")
      .format("yyyy-MM-DD")}&activity_id=${_id}`,
    config,
  );
  return await response.json();
};
