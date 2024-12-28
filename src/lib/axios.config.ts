import axios from 'axios';
import { API_URL } from '../config/apiConfig';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Function to set up axios with the stored auth token
export const setupAxios = (token?: string) => {
  console.log('Setting up axios with token:', token ? 'present' : 'not provided');
  
  if (token) {
    // If token is provided, use it
    console.log('Storing new token');
    localStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Otherwise try to get from localStorage
    const storedToken = localStorage.getItem('authToken');
    console.log('Retrieved stored token:', storedToken ? 'present' : 'not found');
    
    if (storedToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }
};

// Set up axios response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Axios error intercepted:', {
      status: error.response?.status,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        hasAuthHeader: !!error.config?.headers?.Authorization,
      }
    });

    if (error.response?.status === 401) {
      console.log('Unauthorized error - clearing token');
      // Clear token on unauthorized
      localStorage.removeItem('authToken');
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      // Only redirect if not already on the login page
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/admin') || currentPath !== '/admin') {
        console.log('Redirecting to login page');
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

// Set up request interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('Request interceptor:', {
      url: config.url,
      method: config.method,
      hasStoredToken: !!token
    });
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Initialize axios with any stored token
console.log('Initializing axios configuration');
setupAxios();

export default axiosInstance;
