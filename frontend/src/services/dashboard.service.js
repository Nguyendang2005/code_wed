import axiosClient from "./axiosClient";

export const orderService = {
  list: async () => (await axiosClient.get("/api/orders")).data,
  create: async (payload) =>
    (await axiosClient.post("/api/orders", payload)).data,
  updateStatus: async (id, status) =>
    (await axiosClient.patch(`/api/orders/${id}/status`, { status })).data,
};
