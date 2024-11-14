import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', 
});



axiosInstance.interceptors.request.use(
    (config) => {
      // List of URLs to exclude from adding the token
      const excludedUrls = ['/api/auth/login', '/api/auth/register'];
      
      if (!excludedUrls.some((url) => config.url.includes(url))) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `${token}`; 
          console.log("Authorization header set for custom instance");
        } else {
            console.log("Token not found in custom instance");
             alert("You have been logged out. Please login again.")
            window.location.href = '/login';
        }
      } else {
        console.log("Skipping Authorization header for:", config.url);
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear any existing token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
