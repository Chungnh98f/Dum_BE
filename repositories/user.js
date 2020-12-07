const User = require("../models/user");
const db = require("./index");

const findByEmail = async (email) => {
  const dbResult = await db.users.findOne({ email: email });
  console.log(dbResult);
  if (!dbResult) return null;

  const user = new User(
    dbResult.email,
    dbResult.username,
    dbResult.photoUrl,
    dbResult.salt,
    dbResult.hash
  );

  return user;
};

const save = async (user) => {
  const dbResult = await db.users.findOneAndUpdate(
    {
      email: user.email,
    },
    {
      $set: {
        username: user.username,
        photoUrl: user.photoUrl,
        salt: user.salt,
        hash: user.hash,
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );

  const savedUser = new User(dbResult.value, email);
  return savedUser;
};

module.exports = { findByEmail, save };
