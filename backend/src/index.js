import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/authRoute.js";
import messageRoute from "../routes/messageRoute.js";
import { dbConnection } from "../lib/db.js";
import cors from "cors";
import { app ,server } from "../lib/socket.js";
import path from 'path'

dotenv.config();

const port = process.env.PORT;
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  
  app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"))
  })
}



server.listen(port, () => {
  console.log(
    `Your server is listening on port ${port} http://localhost:${port}`
  );
  dbConnection();
});
