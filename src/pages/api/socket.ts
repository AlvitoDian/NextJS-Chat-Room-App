import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
    });

    socket.on("joinDirectMessage", (roomName) => {
      console.log("user joined message", roomName);
      socket.join(roomName);
    });

    socket.on("send-message", (data) => {
      if (data.sendSocket.room) {
        io.to(data.sendSocket.room).emit("receive-message", data.sendSocket);
      } else if (data.sendSocket.messages) {
        /*   io.to(data.sendSocket.sender).emit(
          "receive-message-" + data.sendSocket.sender,
          data.sendSocket
        );
        io.to(data.sendSocket.receiver).emit(
          "receive-message-" + data.sendSocket.receiver,
          data.sendSocket
        );
 */
        io.to(data.sendSocket.sender).emit("receive-message", data.sendSocket);
        io.to(data.sendSocket.receiver).emit(
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
