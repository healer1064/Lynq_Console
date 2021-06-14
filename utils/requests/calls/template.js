const listingPriceReq = async (_token, _price) => {
  const response = await fetch(
    `https://api.lynq.app/account/event-type/simulate?t=${_token}&price=${_price}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export { listingPriceReq };
