import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_SOCKET_URL = import.meta.env.MODE === "development" ?"http://localhost:3000" : "/"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,

  isLogging: false,

  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      await set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      console.log(`Error occurred in checkAuth `, error);
      set({ checkAuth: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });
    toast.success("Account created successfully");
    get().connectSocket();
    try {
    } catch (error) {
      console.log(`error occurred in signup `, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successfully");

      get().connectSocket();
    } catch (error) {
      console.log(`Error occurred in Login `, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogging: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`Error logging out`, error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Pic Updated");
    } catch (error) {
      console.log(`Error occurred in updateProfile `, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_SOCKET_URL, {
      query: {
        userId: authUser._id || authUser.id,
      },
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
