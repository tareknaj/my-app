import axios from "./axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

// Define the login function
export const loginUser = async (username : any, password : any) => {
  try {
    // Send a POST request with username and password to the login API
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });

    // If login is successful, extract the token from the response
    if (response.data.token) {
      const token = response.data.token; // Assuming the token is in the `token` field
      localStorage.setItem('jwtToken', token); // Store the token in localStorage
      console.log('Login successful, JWT token stored.');
      return token; // Return the token
    } else {
      throw new Error('No token received');
    }
  } catch (error : any) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error; // You can handle errors like invalid credentials, etc.
  }
};

// Optionally, you could include more authentication-related methods like logout, check auth status, etc.
export const logoutUser = () => {
  localStorage.removeItem('jwtToken'); // Remove the JWT token from localStorage
  console.log('User logged out.');
};

export const isAuthenticated = () => {
  // Check if the JWT token exists in localStorage (or cookies) to determine authentication status
  return !!localStorage.getItem('jwtToken');
};
