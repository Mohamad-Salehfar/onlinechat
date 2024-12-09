import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected with socket id: ${socket.id}`);

  socket.on("send-message", (message) => {
    socket.broadcast.emit("recive-message", { message, isSender: false });
  });
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
