const express = require("express");
const path = require("path");
const DB = require("./db.js");
const config = require("./config.json");

const router = express.Router();
const db = new DB(path.join(__dirname, config.db_path));

router.route("/highscore")
  .get(async (req, res) => {
    const count = parseInt(req.query.count, 10);
    if (Number.isNaN(count)) {
      res.sendStatus(400);
    }

    const scores = await db.get_highscores(Math.min(count, config.max_count));
    res.send(scores);
  });

module.exports = router;

