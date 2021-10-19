export const getProductRequest = async (asin) => {
  const res = fetch(
    `https://api.rainforestapi.com/request?api_key=BD616DB18E9046F298140445A2A58914&type=product&asin=${asin}&amazon_domain=amazon.com`,
  );
  return (await res).json();
};

export const postAffiliateMarketingReq = async (_token, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/console/affiliate_link?t=${_token}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_reqData),
    },
  );

  return await response;
};

export const putAffiliateMarketingReq = async (_token, _id, _reqData) => {
  const response = await fetch(
    `https://api.lynq.app/console/affiliate_link/${_id}?t=${_token}`,
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

export const getAffiliateMarketingReq = async (_token) => {
  const response = await fetch(
    `https://api.lynq.app/console/affiliate_link?t=${_token}`,
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

export const deleteAffiliateMarketingReq = async (_token, _id) => {
  const response = await fetch(
    `https://api.lynq.app/console/affiliate_link/${_id}?t=${_token}`,
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
