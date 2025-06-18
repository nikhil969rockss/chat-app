import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const userMessageStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingUsers: false,
  isLoadingMessages: false,

  getUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log(`Error occurred in getUsers `, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingUsers: false });
    }
  },
  getMessages: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(`Error occurred in getMessages `, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingMessages: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(`Error in sendMessage function useMessageStore `, error);
      toast.error(error.response.data.message);
    }
  },

  //TODO: Optimize it later
  subscribeToMessage:()=>{
    const {selectedUser,messages} = get()
    if(!selectedUser) return
    const socket = useAuthStore.getState().socket

   
    socket.on("newMessage",(newMessage)=>{
      
      
       if(newMessage.senderID === selectedUser._id) {
       set({messages: [...get().messages, newMessage]})
      }
    })
  },

  unsubscribeFromMessage: ()=>{
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  },
  
  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
  setSelectedUserNull: () => set({ selectedUser: null }),
}));
