import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getSidebarUsers = async (req, res) => {
  const loggedInUserID = req.user._id;
  try {
    // Have to find all the users except loggedIn user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserID },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error occurred in getSidebarUsers controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatID } = req.params;
  try {
    const myID = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderID: myID, receiverID: userToChatID },
        { senderID: userToChatID, receiverID: myID },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error occurred in getMessages controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverID } = req.params;
  try {
    const senderID = req.user._id;
    let imageURL;
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageURL = response.secure_url;
    }
    const newMessage = new Message({
      senderID,
      receiverID,
      text,
      image: imageURL,
    });
    await newMessage.save();

    //TODO: Real time feature socket.io---->DONE
    const receiverSocketID = getReceiverSocketId(receiverID)
    if(receiverSocketID){
      io.to(receiverSocketID).emit("newMessage",newMessage)
    }


    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error occurred in sendMessage controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};
