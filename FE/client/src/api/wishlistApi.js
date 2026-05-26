import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/wishlist";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET WISHLIST
export const getWishlist = () => {
  return axios.get(`${BASE_URL}/`, getAuthHeaders());
};

// ADD TO WISHLIST
export const addToWishlist = (data) => {
  return axios.post(`${BASE_URL}/add/`, data, getAuthHeaders());
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = (id) => {
  return axios.delete(`${BASE_URL}/remove/${id}/`, getAuthHeaders());
};

// WISHLIST COUNT
export const getWishlistCount = () => {
  return axios.get(`${BASE_URL}/`, getAuthHeaders());
};
