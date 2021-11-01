import axios from "axios";

export const Server = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { "Content-Type": "application/json" }
});
export const loginReq = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { "Content-Type": "application/json" }
});

export const regUserReq = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { "Content-Type": "multipart/form-data" }
});