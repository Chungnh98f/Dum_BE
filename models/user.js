const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "my_secret_key";

class User {
  email;
  username;
  photoUrl;
  salt;
  hash;
  jwt;

  constructor(email, username, photoUrl, salt, hash) {
    this.email = email;
    this.username = username;
    this.photoUrl = photoUrl;
    this.salt = salt;
    this.hash = hash;
  }

  generatePassword(newPassword) {
    this.salt = crypto.randomBytes(128).toString("base64");
    this.hash = crypto
      .pbkdf2Sync(newPassword, this.salt, 10000, 512, "sha512")
      .toString("hex");
  }

  verifyPassword(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return hash === this.hash;
  }

  generateJWT() {
    this.jwt = jwt.sign({ username: this.username }, JWT_SECRET, {
      expiresIn: 36000,
    });
  }

  toJson() {
    return {
      username: this.username,
      email: this.email,
      photoUrl: this.photoUrl,
      token: this.jwt,
    };
  }
}

module.exports = User;
