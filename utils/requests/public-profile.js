const getProfileReq = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://api.lynq.app/account/public-profile?t=${_token}`,
    config
  );

  return await response.json();
};

const postProfilePicReq = async (_token, _imageFile) => {
  var formData = new FormData();
  formData.append("image", _imageFile);

  const response = await fetch(
    `https://api.lynq.app/account/public-profile/upload_picture?t=${_token}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};

const postProfileReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/account/public-profile?t=${_token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_reqData),
    }
  );

  return await response.json();
};

const getSlugCheckReq = async (_slug) => {
  const response = await fetch(
    `https://api.lynq.app/account/public-profile/is-available/${_slug}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export { getProfileReq, postProfilePicReq, postProfileReq, getSlugCheckReq };
