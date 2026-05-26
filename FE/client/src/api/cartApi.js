import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/cart/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET CART
export const getCart = async () => {
  return axios.get(BASE_URL, getAuthHeaders());
};

// ADD TO CART
export const addToCart = async (data) => {
  return axios.post(`${BASE_URL}add/`, data, getAuthHeaders());
};

// REMOVE ITEM
export const removeFromCart = async (id) => {
  return axios.delete(`${BASE_URL}remove/${id}/`, getAuthHeaders());
};

export const updateCartQuantity = async (id, data) => {
  return axios.put(`${BASE_URL}update/${id}/`, data, getAuthHeaders());
};
