import axiosClient from "./axiosClient";

export const productService = {
  list: async () => (await axiosClient.get("/api/products")).data,
  create: async (payload) =>
    (await axiosClient.post("/api/products", payload)).data,
  update: async (id, payload) =>
    (await axiosClient.put(`/api/products/${id}`, payload)).data,
  remove: async (id) => (await axiosClient.delete(`/api/products/${id}`)).data,
};
