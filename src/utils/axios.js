import axios from 'axios';

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

export default createAxiosInstance;