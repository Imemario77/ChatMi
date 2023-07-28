import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoute from "./routers/chatRouter.js";
import messageRoute from "./routers/messageRouter.js";
import authRoute from "./routers/authRouter.js";
import updateRoute from "./routers/updateUserRouter.js";
import http from "http";
import { socket, connection, activeUsers } from "./socketServer.js";
import getUserRoute from "./routers/getUsersRouter.js";
dotenv.config();
const app = express();

const httpserver = http.createServer(app);
// -------------- connect the socket --------------
const io = socket(httpserver);
io.on("connection", (socket) => connection(io, socket));

io.emit("onlineUser", activeUsers);
// -------------- connect database --------------
mongoose.connect(process.env.mongodb, () => {
   console.log("connected to database");
});

// -------------- app middleware --------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------- app routers --------------
// chat routers
app.use("/chat", chatRoute);

// message routers
app.use("/message", messageRoute);

// authenticate routers
app.use("/auth", authRoute);

// find Users routers
app.use("/user", getUserRoute);

//update user routers
app.use('/update', updateRoute)

httpserver.listen(process.env.port, () => {
   console.log("server has started on port " + process.env.port);
});
