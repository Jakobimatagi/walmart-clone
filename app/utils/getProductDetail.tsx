import axios, { AxiosRequestConfig } from "axios";

async function getProductDetail(asin: string, country: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://amazon-product-data6.p.rapidapi.com/product-detail",
    params: {
      asin,
      country,
    },
    headers: {
      "X-RapidAPI-Key": "29d2a48d9cmshdfcdd3fe778090dp162ec8jsn3ed887fdbae2",
      "X-RapidAPI-Host": "amazon-product-data6.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default getProductDetail;
