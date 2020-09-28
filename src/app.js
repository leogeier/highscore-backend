const express = require("express");
const config = require("./config.json");
const DB = require("./DB");

const app = express();
console.log(DB);
const db = new DB(config.db_path);

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
