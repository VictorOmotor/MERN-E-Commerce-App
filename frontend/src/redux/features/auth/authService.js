import axios from 'axios';

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL
export const API_URL = 'http://localhost:5000/api/user/';

const register = async (formData) => {
  const response = await axios.post(`${API_URL}register`, formData, {
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const login = async (formData) => {
  const response = await axios.post(`${API_URL}login`, formData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}logout`);
  return response.data.message;
};

const getLoginStatus = async () => {
  const response = await axios.get(`${API_URL}loginstatus`);
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const updateUserInfo = async (userData) => {
  const response = await axios.put(`${API_URL}profile`, userData);
  return response.data;
};

const updateUserPhoto = async (userData) => {
  const response = await axios.put(`${API_URL}profile/photo`, userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUserInfo,
  updateUserPhoto
};

export default authService;
