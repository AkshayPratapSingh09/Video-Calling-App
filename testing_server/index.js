const express = require("express");
const http = require("http");
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const connectedUsers = new Set();

io.on("connection", (socket) => {
  socket.on("joinRoom", (username) => {
    connectedUsers.add(username);
    io.emit("updateUsers", Array.from(connectedUsers));

    socket.emit("backendUpdateUsers", Array.from(connectedUsers));
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.username);

    io.emit("updateUsers", Array.from(connectedUsers));
  });
});

app.get("/connectedUsers", (req, res) => {
  res.json(Array.from(connectedUsers));
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
