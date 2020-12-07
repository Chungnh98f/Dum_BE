const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const router = require("./api");
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
require("./repositories/index");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

server.listen(5050, () => {
  console.log("Server is running in 5050");
});
