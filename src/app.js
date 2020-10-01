const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const get_score_router = require("./router.js");

if (config.secret === "change_me") {
  console.warn("\x1b[41m\x1b[30mYou should strongly consider changing the secret!\x1b[0m");
}

const app = express();

app.use(
  cors(),
  morgan("short"),
  morgan("short", {stream: fs.createWriteStream(path.join(__dirname, "..", config.log_path), {flags: "a"})}),
  get_score_router(path.join(__dirname, "..", config.db_path), config.secret));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
