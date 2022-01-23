import { create } from 'apisauce';

const BASE_URL = 'https://free.currconv.com/api/v7';

const Api = create({
  baseURL: `${BASE_URL}`,
  timeout: 20000,
  headers: {},
});

export default Api;
