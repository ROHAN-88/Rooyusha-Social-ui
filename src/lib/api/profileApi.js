import { $axios } from "../axios";

export const profileApi = () => {
  return $axios.get("/getuserdetail");
};

export const userPost = () => {
  return $axios.get("/getPostOfUser");
};

export const editUserData = (id, values) => {
  return $axios.put(`/EditProfile/${id}`, values);
};
