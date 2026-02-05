import axiosClient from "./axiosClient";

export const authService = {
  login: async (email, password) => {
    const res = await axiosClient.post("/api/auth/login", { email, password });
    return res.data; // { token, user }
  },
  me: async () => {
    const res = await axiosClient.get("/api/auth/me");
    return res.data;
  },
  logout: async () => true,
};
