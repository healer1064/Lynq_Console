const getCallsList = async (_token) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(
    `https://aks.lynq.app/legacy/account/appointments?t=${_token}`,
    config
  );

  return await response.json();
};

export { getCallsList };
