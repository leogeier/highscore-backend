const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const router = require("./router.js");

if (config.secret === "change_me") {
  console.warn("\x1b[41m\x1b[30mYou should strongly consider changing the secret!\x1b[0m");
}

const app = express();

app.use(
  morgan("short"),
  morgan("short", {stream: fs.createWriteStream(path.join(__dirname, "..", config.log_path), {flags: "a"})}),
  router);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
