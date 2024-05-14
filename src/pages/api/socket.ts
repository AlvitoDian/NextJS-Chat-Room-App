import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    //? Socket On Grup Chat
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
    });

    //? Socket On Direct Message
    socket.on("joinDirectMessage", (roomName) => {
      socket.join(roomName);
    });

    //? Emit to Users in a Room and Direct Message
    socket.on("send-message", (data) => {
      if (data.sendSocket.room) {
        io.to(data.sendSocket.room).emit("receive-message", data.sendSocket);
      } else if (data.sendSocket.messages) {
        io.to(data.sendSocket.sender._id).emit(
          "receive-message",
          data.sendSocket
        );
        io.to(data.sendSocket.receiver._id).emit(
          "receive-message",
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
