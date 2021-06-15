const getSlotsReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const response = await fetch(
    `https://api.lynq.app/account/working-slots?t=${_token}`,
    config
  );
  return await response.json();
};

const delSlotReq = async (_id, _token) => {
  const response = await fetch(
    `https://api.lynq.app/account/working-slots/${_id}?t=${_token}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await response;
};

const postToggleSlotReq = async (_token, _day) => {
  const response = await fetch(
    `https://api.lynq.app/account/working-slots/toggle-enable?t=${_token}&day=${_day}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await response;
};

const postAddSlotReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/account/working-slots?t=${_token}`,
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

const putUpdateSlotReq = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/account/working-slots/${_id}?t=${_token}`,
    {
      method: "PUT",
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
  getSlotsReq,
  delSlotReq,
  postToggleSlotReq,
  postAddSlotReq,
  putUpdateSlotReq,
};
