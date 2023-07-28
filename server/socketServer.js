import { Server } from "socket.io";
import { networkInterfaces } from "os";
const net = networkInterfaces();

let ip = "";
if (net.ccmni1) {
   ip = net.ccmni1[0].address;
} else if (net.ccmni0) {
   ip = net.ccmni0[0].address;
}

console.log(`http://${ip}:3000`);
console.log(`http://${ip}:3000`);

export const socket = (server) => {
   return new Server(server, {
      cors: {
         origin: [
            "http://localhost:3000",
            `http://${ip}:3000`,
            "http://192.168.107.210:3000",
            '*'
         ],
      },
   });
};
export var activeUsers = [];
export const connection = (io, socket) => {
   console.log(socket.id);
   socket.on("joinChat", (userid) => {
      if (activeUsers.some((user) => user.userId === userid)) {
         activeUsers = activeUsers.filter((user) => {
            return user.userId !== userid;
         });
         activeUsers.push({
            userId: userid,
            socketId: socket.id,
         });
         io.emit("onlineUser", activeUsers);
      } else {
         activeUsers.push({
            userId: userid,
            socketId: socket.id,
         });
         io.emit("onlineUser", activeUsers);
      }
   });
   socket.on("stoped_typing", (info) => {
      console.log("stop typing now ");
      let reciver = activeUsers.filter((data) => {
         return data.userId === info.reciverId;
      });
      if (reciver) {
         reciver.map((id) => io.to(id.socketId).emit("stop_typing", info));
      }
   });
   socket.on("typing", (info) => {
      console.log("typing now ");
      let reciver = activeUsers.filter((data) => {
         return data.userId === info.reciverId;
      });
      if (reciver) {
         reciver.map((id) => io.to(id.socketId).emit("typing", info));
      }
   });
   socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("user disconnected: " + socket.id);
      io.emit("onlineUser", activeUsers);
   });
   socket.on("sendMessage", (message, room) => {
      console.log(message);
      let reciver = activeUsers.filter((data) => {
         return data.userId === message.reciverId;
      });
      if (!room) {
         if (reciver) {
            console.log(reciver);
            reciver.map((id) =>
               io.to(id.socketId).emit("reciveMessage", message)
            );
         }
      } else {
         console.log(room);
         socket.to(room).emit("reciveMessage", message);
      }

      io.to("allmessages").emit("reciveallMessage", message);
   });
   socket.on("joinGroupChat", (room) => {
      socket.join(room);
      console.log(socket.id + " joined this Group");
   });
};
