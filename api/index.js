const express = require("express");
const { route } = require("./auth");

const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);

router.get("/", (req, res) => {
  res.json("Hello world");
});

module.exports = router;
