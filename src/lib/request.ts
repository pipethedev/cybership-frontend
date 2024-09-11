import axios, { AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4599',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
});

const fetch = async <T>(endpoint: string): Promise<T> => {
  return httpClient.get(endpoint).then(setResponse);
  // const response = await httpClient.get<T>(endpoint);
  // return response.data;
};

const setResponse = (res: AxiosResponse) => res.data;

const request = { fetch };
export default request;
