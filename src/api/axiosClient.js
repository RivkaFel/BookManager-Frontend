import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7092/api",
    headers: {
        'Content-Type' : 'application/json'
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  export { axiosClient };