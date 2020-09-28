const express = require("express");
const config = require("./config.json");

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
