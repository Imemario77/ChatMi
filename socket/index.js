const io = require("socket.io")(8080, {
   cors: {
      origin: ["http://localhost:3000"],
   },
});
console.log("web socket has started");
var activeUsers = [];
io.on("connection", (socket) => {
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

      //  console.log(activeUsers);
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
});
io.emit("onlineUser", activeUsers);
