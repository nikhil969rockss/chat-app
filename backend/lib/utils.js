import jwt from "jsonwebtoken";
export const generateJWTtoken = async(userID, res) => {
  const token = await jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwtToken", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true, // prevent XSS attack cross-site scripting attack
    sameSite: "strict", // prevent CSRF attack cross-site request forgery attack 
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
