import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("ID : ", socket.id);
    socket.on("send-message", (obj) => {
      console.log(obj.sendSocket);
      io.emit("receive-message", obj.sendSocket);
    });
  });

  console.log("Setting up socket");
  res.end();
}
