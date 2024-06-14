import axios from 'axios';
import Cookies from 'js-cookie';
import { setCookie } from 'cookies-next';




// const baseURL = 'http://localhost:8080/auth'
const baseURL = 'https://localhost:8081/auth'
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
    ,  withCredentials: true
  });
  

export const registerUser = async (formData : any) => {
    try {
        const response = await axiosInstance.post('/register', formData);
        console.log('Registration successful:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error during registration:', error);
        throw error;
      }
};


// Function to log in a user
export const loginUser = async (formData : any) => {
  try {
    const response = await axiosInstance.post('/login', formData);
    console.log('Login successful:', response);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/me');
      console.log('Fetched user info:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
}

export const logoutUser = async () => {
    try {
      const response = await axiosInstance.get('/logout');
      console.log('Logout successful:', response.data);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
}

