import axios from "axios";

export const applyCoupon = (data) => {
  return axios.post("http://127.0.0.1:8000/api/apply-coupon/", data);
};
