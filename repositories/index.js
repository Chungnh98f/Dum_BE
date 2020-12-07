const mongo = require("mongodb");

let db = {};

const client = new mongo.MongoClient("mongodb://localhost:27017");

client.connect().then((connectedClient) => {
  console.log("Connected to mongodb !!");
  const database = connectedClient.db("dum_database");
  db.users = database.collection("Users");
});

module.exports = db;
