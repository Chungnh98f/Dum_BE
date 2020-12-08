const mongo = require("mongodb");

let db = {};

const client = new mongo.MongoClient(
  "mongodb+srv://chungnh:chungnh@cluster0.n3k8k.mongodb.net/dumdb?retryWrites=true&w=majority"
);

client.connect().then((connectedClient) => {
  console.log("Connected to mongodb !!");
  const database = connectedClient.db("dumdb");
  db.users = database.collection("Users");
});

module.exports = db;