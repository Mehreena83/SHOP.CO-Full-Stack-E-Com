import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// GET ALL PRODUCTS
export const fetchProducts = (params) =>
  API.get("products/", {
    params,
  });

// GET SINGLE PRODUCT
export const fetchProduct = (slug) => API.get(`products/${slug}/`);

// CREATE PRODUCT
export const createProduct = (data) => API.post("products/", data);
