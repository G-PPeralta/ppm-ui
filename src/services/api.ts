import axios from 'axios';

const urlAPI = `${process.env.REACT_APP_API_URL}`;

export const api = axios.create({
  baseURL: urlAPI,
});
