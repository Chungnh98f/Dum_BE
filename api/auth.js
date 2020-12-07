const express = require("express");
const router = express.Router();
const AuthService = require("../services/auth");

router.post("./sign-in", async (req, res) => {
  try {
    const user = await AuthService.signIn(req.body.email, req.body.password);
    res.json(user.toJson());
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post("./sign-up", async (req, res) => {
  try {
    const newUser = await AuthService.signUp(
      req.body.username,
      req.body.password
    );
    res.json(newUser.toJson());
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
