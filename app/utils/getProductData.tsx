import axios, { AxiosRequestConfig } from 'axios';

export async function getProductData(q: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://amazon-product-data6.p.rapidapi.com/product-by-text',
    params: {
      keyword: q,
      page: '1',
      country: 'US',
      sort_by: 'feature'
    },
    headers: {
      'X-RapidAPI-Key': '29d2a48d9cmshdfcdd3fe778090dp162ec8jsn3ed887fdbae2',
      'X-RapidAPI-Host': 'amazon-product-data6.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}
