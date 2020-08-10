import axios from "axios";

let user = JSON.parse(localStorage.getItem("user"));
const client = axios.create({
  baseURL: "http://localhost:5051/",
  headers: {
    "Content-type": "application/json",
    Authorization: user ? user.token : "",
  },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // localStorage.removeItem("user");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default client;
