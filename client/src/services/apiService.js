import axiosInstance from "./axiosInstance";

const API_BASE_URL = '/api';

// Register user
export const registerUser = async (userData) => {
  return await axiosInstance.post(`${API_BASE_URL}/auth/register`, userData);
};

// Login user
export const loginUser = async (credentials) => {
  return await axiosInstance.post(`${API_BASE_URL}/auth/login`, credentials);
};

// Fetch all books
export const fetchBooks = async () => {
  return await axiosInstance.get(`${API_BASE_URL}/books/available`);
};

// Add new book
export const addBook = async (bookData) => {
  return await axiosInstance.post(`${API_BASE_URL}/books/add`, bookData);
};

// Fetch user's requests
export const fetchUserRequests = async () => {
  return await axiosInstance.get(`${API_BASE_URL}/requests/user-requests`);
};

// Fetch requests received by the user (as book owner)
export const fetchOwnerRequests = async () => {
  return await axiosInstance.get(`${API_BASE_URL}/requests/owner`);
};

// Respond to a request (accept/decline)
export const respondToRequest = async (requestId, action) => {
  return await axiosInstance.patch(`${API_BASE_URL}/requests/update`, { requestId, action });
};

// Create new request
export const requestBook = async (bookId) => {
  return await axiosInstance.post(`${API_BASE_URL}/requests/request`, { bookId });
};

export default {
  registerUser,
  loginUser,
  fetchBooks,
  addBook,
  fetchUserRequests,
  fetchOwnerRequests,
  respondToRequest,
  requestBook,
};
