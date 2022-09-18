import axios from "axios";

const urlAPI = `${process.env.REACT_APP_API_URL}`;

export const api = axios.create({
  baseURL: urlAPI,
});

export const token = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
  },
});
