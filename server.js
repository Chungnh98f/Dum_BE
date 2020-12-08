const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const router = require("./api");
const bodyParser = require("body-parser");
const io = require("socket.io")(server);
require("./repositories/index");

const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT || 5050, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
