import axios from "axios";

const API_URL = "http://localhost:5051";

const login = (user_id, password) => {
  return axios
    .get(`${API_URL}/login`, {
      params: {
        user_id,
        password,
      },
    })
    .then((response) => {
      let { data } = response.data;
      if (data && data.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
