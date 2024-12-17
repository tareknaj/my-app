import axios from 'axios';

// Create an Axios instance with a base URL for your backend API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // Replace with your Spring Boot API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage

    if (token) {
      // Attach token to Authorization header as a Bearer token
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, you can handle response errors or add other interceptors if needed

// Export the Axios instance for use throughout your application
export default axiosInstance;