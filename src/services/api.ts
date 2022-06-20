import axios from 'axios';

const urlAPI = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

export const api = axios.create({
  baseURL: urlAPI,
});
