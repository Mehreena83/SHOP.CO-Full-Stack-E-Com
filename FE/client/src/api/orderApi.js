import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/orders/";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// CREATE ORDER

export const createOrder = (data) => {
  return axios.post(`${BASE_URL}create/`, data, getAuthHeaders());
};

// GET ORDERS
export const getOrders = async () => {
  return axios.get(BASE_URL, getAuthHeaders());
};

export const cancelOrder = async (id) => {
  const token = localStorage.getItem("token");

  return axios.patch(
    `http://127.0.0.1:8000/api/orders/${id}/cancel/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
