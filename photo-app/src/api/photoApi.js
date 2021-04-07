import axiosClient from "./axiosClient";

// api/productApi.js
class PhotoApi {
  getAll = (params) => {
    const url = "/photos";
    return axiosClient.get(url, { params });
  };
  delete = (params) => {
    const url = `/photos/${params.id}`;
    return axiosClient.delete(url, {  });
  };
  store = (params) => {
    const url = `/photos`;
    return axiosClient.post(url, {params})
  };
  update = (params,id) => {
    const url = `/photos/${params.id}`;
    return axiosClient.put(url,{params})
  }
}
const photoApi = new PhotoApi();
export default photoApi;


