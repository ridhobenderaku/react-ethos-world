import axios from "axios";

export const baseURlView = axios.create({
  baseURL: process.env.REACT_APP_API_PROD_VIEW,
  headers: {
    secretkey: process.env.REACT_APP_API_SECRETKEY_VIEW,
    secretcode: process.env.REACT_APP_API_SECRETCODE_VIEW,
    "Content-Type": "application/json",
  },
});

export const baseURlPost = axios.create({
  baseURL: process.env.REACT_APP_API_PROD_POST,
  headers: {
    secretkey: process.env.REACT_APP_API_SECRETKEY_POST,
    secretcode: process.env.REACT_APP_API_SECRETCODE_POST,
    "Content-Type": "application/json",
  },
});
