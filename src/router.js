const express = require("express");
const DB = require("./db.js");
const config = require("./config.json");

const router = express.Router();
const db = new DB(config.path);

router.route("/highscore")
  .get(async (req, res) => {
    const count = parseInt(req.query.count, 10);
    if (Number.isNaN(count)) {
      res.sendStatus(400);
    }

    res.send(await db.get_highscores(count));
  });

module.exports = router;

