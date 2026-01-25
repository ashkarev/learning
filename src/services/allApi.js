import axiosConfig from "./axiosConfig";
import { baseUrl } from "./baseUrl";

export const registerApi = async (reqBody) => {
  return await axiosConfig("post", `${baseUrl}/register`, reqBody);
};
export const loginApi = async (reqBody) => {
  return await axiosConfig("post", `${baseUrl}/login`, reqBody);
};
export const googleApi = async (reqBody) => {
  return await axiosConfig("post", `${baseUrl}/googleLogin`, reqBody);
};

export const getUserDetails = async (reqHeader) => {
  return await axiosConfig("get", `${baseUrl}/userDetails`, "", reqHeader);
};

export const updateUser=async(id,reqBody,reqHeader)=>{
    return await axiosConfig('patch',`${baseUrl}/editProfile/${id}`,reqBody,reqHeader)
}
