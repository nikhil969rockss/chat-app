import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async(req, res, next) => {
  const token = req.cookies.jwtToken;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthenticated, Please login first" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token, Login again" });
    }
    const user = await User.findById(decodedToken.id).select("-password"); // not sending password to the user object
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware `, error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
