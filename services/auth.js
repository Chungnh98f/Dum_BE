const userRepo = require("../repositories/user");
const User = require("../models/user");

const signUp = async (email, password, username) => {
  const exitedUser = await userRepo.findByEmail(email);
  console.log(exitedUser);

  if (exitedUser) {
    throw new Error("User is existed");
  }

  const user = new User(email);
  user.generatePassword(password);
  const savedUser = await userRepo.save(user);
  return savedUser;
};

const signIn = async (email, password) => {
  const existedUser = await userRepo.findByEmail(email);
  if (!existedUser) {
    throw new Error("Username is not existed !!!");
  }
  if (!existedUser.verifyPassword(password)) {
    throw new Error("Password not matched !!!");
  }
  existedUser.generateJWT();
  return existedUser;
};

module.exports = { signUp, signIn };
