import axios from 'axios';

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
  const response = await axios.post(`${API_URL}login`, formData, {});
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
