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
