import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/reviews/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getReviews = (productId) => API.get(`${productId}/`);

export const createReview = (productId, data) =>
  API.post(`create/${productId}/`, data);
