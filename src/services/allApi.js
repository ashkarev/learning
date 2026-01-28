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

export const updateUser = async (id, reqBody, reqHeader) => {
  return await axiosConfig('patch', `${baseUrl}/editProfile/${id}`, reqBody, reqHeader)
}

// User Management
export const getAllUsersApi = async (reqHeader) => {
  return await axiosConfig("get", `${baseUrl}/AllUsers`, "", reqHeader);
};

// Job Management
export const addJobApi = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseUrl}/addJob`, reqBody, reqHeader);
};

export const getAllJobsApi = async () => {
  return await axiosConfig("get", `${baseUrl}/getAllJobs`, "");
};

export const deleteJobApi = async (id, reqHeader) => {
  return await axiosConfig("delete", `${baseUrl}/${id}/deleteJob`, {}, reqHeader);
};

// Application Management
export const getAllApplicationsApi = async (reqHeader) => {
  return await axiosConfig("get", `${baseUrl}/getAllApplication`, "", reqHeader);
};

export const deleteApplicationApi = async (id, reqHeader) => {
  return await axiosConfig("delete", `${baseUrl}/${id}/deleteApplication`, {}, reqHeader);
};

export const applyJobApi = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseUrl}/applyJob`, reqBody, reqHeader);
};

// Course Management
export const getAllCoursesApi = async (reqHeader) => {
  return await axiosConfig("get", `${baseUrl}/getAllCourses`, "", reqHeader);
};

export const addCourseApi = async (reqBody, reqHeader) => {
  return await axiosConfig("post", `${baseUrl}/addCourse`, reqBody, reqHeader);
};

export const deleteCourseApi = async (id, reqHeader) => {
  return await axiosConfig("delete", `${baseUrl}/${id}/deleteCourse`, {}, reqHeader);
};
