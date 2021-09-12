const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", socket => {
  socket.on("joined", () => {
    io.emit("joined");
  });
  socket.on("disconnect", () => {
    io.emit("leave");
  });
  socket.on('welc', (user) => {
    io.emit('welc', user);
  });
  socket.on('chatmsg', (user, msg) => {
    io.emit('chatmsg', user, msg);
  });
});

server.listen(3000);
