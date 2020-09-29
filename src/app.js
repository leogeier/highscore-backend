const express = require("express");
const config = require("./config.json");
const DB = require("./DB");
const router = require("./router.js");

if (config.secret === "change_me") {
  console.warn("\x1b[41m\x1b[30mYou should strongly consider changing the secret!\x1b[0m");
}

const app = express();
const db = new DB(config.db_path);

app.use(router);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
