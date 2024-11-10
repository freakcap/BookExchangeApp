import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Set the token in the headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Register user
export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, userData);
};

// Login user
export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
};

// Fetch all books
export const fetchBooks = async () => {
  return await axios.get(`${API_BASE_URL}/books/available`);
};

// Add new book
export const addBook = async (bookData) => {
  return await axios.post(`${API_BASE_URL}/books/add`, bookData);
};

// Fetch user's requests
export const fetchUserRequests = async () => {
  return await axios.get(`${API_BASE_URL}/requests/user-requests`);
};

// Fetch requests received by the user (as book owner)
export const fetchOwnerRequests = async () => {
  return await axios.get(`${API_BASE_URL}/requests/owner`);
};

// Respond to a request (accept/decline)
export const respondToRequest = async (requestId, action) => {
  return await axios.post(`${API_BASE_URL}/requests/update`, { requestId, action });
};

// export default {
//   setAuthToken,
//   registerUser,
//   loginUser,
//   fetchBooks,
//   addBook,
//   fetchUserRequests,
//   fetchOwnerRequests,
//   respondToRequest,
// };
