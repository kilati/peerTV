// deno-lint-ignore-file
import axios from "axios";
import { API_URL } from "./constants.ts";

const instance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

export default instance;
