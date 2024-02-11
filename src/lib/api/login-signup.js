import { $axios } from "../axios";

export const loginApi = async (values) => {
  return await $axios.post("/login", values);
};

export const registerApi = async (values) => {
  return await $axios.post("/register", values);
};
