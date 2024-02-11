import axios from "axios";

export const $axios = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "local"
      ? import.meta.env.VITE_API_LOCALHOST
      : import.meta.env.VITE_API_PRODUCT,
  timeout: 5000,
});

//!setting certain need info in local storage through axios
$axios.interceptors.request.use(function (config) {
  // extract accesstoken from local storage
  const accesstoken = localStorage.getItem("accesstoken");

  // if token, set it to every request
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  return config;
});
