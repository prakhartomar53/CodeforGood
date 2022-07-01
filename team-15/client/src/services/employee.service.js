import axios from "axios";
import store from "../store/store";
const BACKEND_URL = "http://localhost:8080/api/employee";

export const SignInEmployee = async (body) => {
  const { data } = await axios.post(`${BACKEND_URL}/sign-in`, body);
  return data;
};

export const GetIndividualEmployeeDetails = async (uid) => {
  const { data } = await axios.get(
    `${BACKEND_URL}/get-dashboard-details?employee=${uid}`
  );
  return data;
};

export const GetProbatedEmployees = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/get-probated`);
  return data;
};

export const ChangeLocation = async (body) => {
  const token = store.getState().user.token;
  const { data } = await axios.post(`${BACKEND_URL}/change-location`, body, {
    headers: { token },
  });
  return data;
};

export const GetAllCourses = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/get-all-courses`);
  return data;
};

export const AddGoal = async (body) => {
  const token = store.getState().user.token;
  const { data } = await axios.post(`${BACKEND_URL}/add-goal`, body, {
    headers: { token },
  });
  return data;
};

export const AddCourse = async (body) => {
  const token = store.getState().user.token;
  const { data } = await axios.post(`${BACKEND_URL}/add-course`, body, {
    headers: { token },
  });
  return data;
};
