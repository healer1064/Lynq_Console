const getCalStatusReq = async (_id) => {
  const config = {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://cal.lynq.app/status?uid=${_id}`,
    config
  );
  return await response.json();
};
export { getCalStatusReq };
