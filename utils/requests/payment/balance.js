const getPaymentsReq = async (_token) => {
  let config = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  const response = await fetch(
    `https://aks.lynq.app/payments/balance?t=${_token}`,
    config
  );
  return await response.json();
};

const postRequestPaymentReq = async (_token) => {
  const response = await fetch(
    `https://aks.lynq.app/payments/cashout?t=${_token}`,
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

export { getPaymentsReq, postRequestPaymentReq };
