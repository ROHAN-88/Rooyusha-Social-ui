import { $axios } from "../axios";

export const creatPost = async (values) => {
  return await $axios.post("/addPost", values);
};

export const getPost = async () => {
  return await $axios.get("/getPosts");
};

export const getPostById = async (id) => {
  return await $axios.get(`/getPost/${id}`);
};

export const deletePost = async (id) => {
  return await $axios.delete(`/deletePost/${id}`);
};

export const editPost = async (id, values) => {
  return await $axios.put(`/editPost/${id}`, values);
};
