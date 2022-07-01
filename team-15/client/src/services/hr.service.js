import axios from "axios";
import store from "../store/store";

const BACKEND_URL = "http://localhost:8080/api/hr";

export const GetAllEmployees = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/get-all-employees`);

  return data;
};

export const SignIn = async (body) => {
  console.log(body);
  const { data } = await axios.post(`${BACKEND_URL}/sign-in`, body);
  return data;
};

export const GetAllRoles = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/get-roles`);
  return data;
};

export const GetAllApplications = async () => {
  const { data } = await axios.get(
    "http://localhost:8080/api/application/get-all-applications"
  );
  return data;
};
export const RejectApplication = async (body) => {
  const { user } = store.getState();

  const { data } = await axios.post(
    "http://localhost:8080/api/application/reject-application",
    body,
    {
      headers: {
        token: user.token,
      },
    }
  );
  return data;
};

export const AcceptApplication = async (body) => {
  const { user } = store.getState();

  const { data } = await axios.post(
    "http://localhost:8080/api/application/accept-application",
    body,
    {
      headers: {
        token: user.token,
      },
    }
  );
  return data;
};

export const UploadCourse = async (body) => {
  const token = store.getState().user.token;
  const { data } = await axios.post(`${BACKEND_URL}/add-course`, body, {
    headers: { token },
  });

  return data;
};
