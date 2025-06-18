import cloudinary from "../lib/cloudinary.js";
import { generateJWTtoken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  //check if the user is exist
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email is already exist " });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should have at least 6 character " });
    }
    // creating hash password using bcrypt
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });
    // once user is created send jwt token in cookies
    if (newUser) {
      generateJWTtoken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in Sign in controller ", error.message);
    res.status(500).send("something went wrong");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // we should not tell client whether the user is present or not in the database or not cause it could be malicious input
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    await generateJWTtoken(user._id, res);
    return res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in login controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(`Error in logout controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResult.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error in updateProfile controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkAuth = (req, res) => {
  try {
    
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in checkAuth controller `, error.message);
    res.status(500).json({ message: "something went wrong" });
  }
};
