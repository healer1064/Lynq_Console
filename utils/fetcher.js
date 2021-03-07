const fetcher = async (url, data) => {
  console.log(url, data);
  const res = await fetch(url, {
    headers: new Headers({ "Content-Type": "application/json", data }),
  });

  return res.json();
};

export default fetcher;
