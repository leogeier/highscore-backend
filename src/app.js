const express = require("express");
const config = require("./config.json");
const DB = require("./DB");

if (config.secret === "change_me") {
  console.warn("\x1b[41m\x1b[30mYou should strongly consider changing the secret!\x1b[0m");
}

const app = express();
const db = new DB(config.db_path);

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
