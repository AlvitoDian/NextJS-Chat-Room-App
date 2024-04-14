import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
    });

    socket.on("joinDirectMessage", (roomName) => {
      console.log("user joined message", roomName);
      socket.join(roomName);
    });

    /* socket.on("joinDirectMessage", (roomNames) => {
      if (Array.isArray(roomNames)) {
        // Bergabung ke setiap ruang dalam array roomNames
        roomNames.forEach((roomName) => {
          console.log("user joined message", roomName);
          socket.join(roomName);
        });
      } else {
        console.error("Room names should be an array.");
      }
    }); */

    socket.on("send-message", (data) => {
      if (data.sendSocket.room) {
        io.to(data.sendSocket.room).emit("receive-message", data.sendSocket);
      } else if (data.sendSocket.messages) {
        /*     io.to(data.sendSocket._id).emit("receive-message", data.sendSocket); */
        io.to(data.sendSocket._id).emit(
          "receive-message-" + data.sendSocket._id,
          data.sendSocket
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  res.end();
}
