export const postExclusiveContentReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/exclusive-content/adm?t=${_token}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response.json();
};

export const postExclusiveContentFileReq = async (_id, _token, _file) => {
  var formData = new FormData();
  formData.append('file', _file);

  const response = await fetch(
    `https://api.lynq.app/exclusive-content/adm/upload/${_id}?t=${_token}`,
    {
      method: 'POST',
      body: formData,
    },
  );

  return await response.json();
};

export const putExclusiveContentReq = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/exclusive-content/adm/${_id}?t=${_token}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response;
};

export const getExclusiveContentReq = async (_token) => {
  const response = await fetch(
    `https://api.lynq.app/exclusive-content/adm?t=${_token}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return await response.json();
};

export const deleteExclusiveContentReq = async (_token, _id) => {
  const response = await fetch(
    `https://api.lynq.app/exclusive-content/adm/${_id}?t=${_token}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return await response.json();
};
