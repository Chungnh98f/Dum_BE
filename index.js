const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./api");
const bodyParser = require("body-parser");
const user = require("./repositories/user");
const e = require("express");
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origins: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});
require("./repositories/index.js");

app.use(bodyParser.json());
app.use(router);

let listUserOnline = [];
const users = {};

io.on("connection", (socket) => {
  // User in main room
  socket.on("user-sign-in-success", (user) => {
    listUserOnline.push(user);
    io.emit("list-user-online", listUserOnline);
  });
  //User join room
  socket.on("join-room", (roomId, user) => {
    if (users[roomId]) {
      const length = users[roomId].length;
      if (length === 4) {
        socket.emit("room-full");
        return;
      }
      users[roomId].push(user);
    } else {
      users[roomId] = [user];
    }
    socket.join(roomId);
    const usersInThisRoom = users[roomId].filter(
      (user) => user.id !== socket.id
    );
    socket.to(roomId).broadcast.emit("user-connected", usersInThisRoom);

    socket.on("send-message", (user, message) => {
      io.to(roomId).emit("create-message", {
        id: socket.id,
        username: user.username,
        content: message,
        photoUrl: user.photoUrl,
      });
    });
    socket.on("disconnect-room", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", user);
    });
  });
  socket.on("disconnect", () => {
    listUserOnline = listUserOnline.filter((user) => {
      return user.id != socket.id;
    });
    io.emit("user-disconnected", listUserOnline);
  });
  socket.on("send-message-main-room", (user, message) => {
    io.emit("create-message-main-room", {
      id: socket.id,
      username: user.username,
      content: message,
      photoUrl: user.photoUrl,
    });
  });
}
server.listen(process.env.PORT || 5050, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
