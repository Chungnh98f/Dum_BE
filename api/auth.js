const express = require("express");
const router = express.Router();
const AuthService = require("../services/auth");

router.post("/sign-in", async (req, res) => {
  try {
    const user = await AuthService.signIn(req.body.email, req.body.password);
    res.json(user.toJson());
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const newUser = await AuthService.signUp(
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.photoUrl
    );
    res.json(newUser.toJson());
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get("/sign-out", (req, res) => {
  res.status(200).send({ token: null, message: "Sign Out success" });
});

module.exports = router;
