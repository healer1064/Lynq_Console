export const getProductRequest = async (asin) => {
  const res = fetch(
    `https://api.rainforestapi.com/request?api_key=BD616DB18E9046F298140445A2A58914&type=product&asin=${asin}&amazon_domain=amazon.com`,
  );
  return (await res).json();
};
