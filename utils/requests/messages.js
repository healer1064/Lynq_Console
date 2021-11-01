const getMessageTemplate = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(
    `https://aks.lynq.app/legacy/feat/message?t=${_token}`,
    config,
  );
  return await response.json();
};

const postMessageTemplate = async (_token, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/feat/message?t=${_token}`,
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

const putMessageTemplate = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/feat/message/${_id}?t=${_token}
`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    },
  );
  return await response.json();
};

const getAsyncReq = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(
    `https://aks.lynq.app/legacy/async/requests?t=${_token}`,
    config,
  );
  return await response.json();
};

const postDocReq = async (_id, _token, _videoFile) => {
  var formData = new FormData();
  formData.append("image", _videoFile);

  const response = await fetch(
    `https://aks.lynq.app/legacy/async/${_id}/upload?t=${_token}`,
    {
      method: "POST",
      body: formData,
    },
  );

  return await response.json();
};

const postMsgReq = async (_token, _id, _message) => {
  const _reqData = {
    content: _message,
  };

  const response = await fetch(
    `https://aks.lynq.app/legacy/async/${_id}/message?t=${_token}`,
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

const postAckReq = async (_token, _id) => {
  const response = await fetch(
    `https://aks.lynq.app/legacy/async/${_id}/ack?t=${_token}`,
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

export {
  getAsyncReq,
  postDocReq,
  postMsgReq,
  getMessageTemplate,
  postMessageTemplate,
  putMessageTemplate,
  postAckReq,
};
