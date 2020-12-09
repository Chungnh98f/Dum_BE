const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./api");
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("./repositories/index.js");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("send-message", (userId, message) => {
      io.to(roomId).emit("create-message", userId, message);
    });
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });

  socket.on("send-message-main-room", (message) => {
    io.emit("create-message-main-room", message);
  });
});

app.listen(process.env.PORT || 5050, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
