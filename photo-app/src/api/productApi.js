import axiosClient from "./axiosClient";

// api/productApi.js
const ProductApi = {
  getAll: (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};
const productApi = new ProductApi();
export default productApi;
