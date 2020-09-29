const express = require("express");
const path = require("path");
const DB = require("./db.js");
const {get_fingerprint} = require("./util.js");
const config = require("./config.json");

const router = express.Router();
const db = new DB(path.join(__dirname, "..", config.db_path));

router.route("/highscore")
  .get(async (req, res) => {
    const count = parseInt(req.query.count, 10);
    if (Number.isNaN(count)) {
      res.sendStatus(400);
    }

    const scores = await db.get_highscores(Math.min(count, config.max_count));
    res.send(scores);
  })
  .post((req, res) => {
    const score = parseInt(req.query.score, 10);
    const time = parseInt(req.query.time, 10);
    const fingerprint = req.query.fingerprint;
    if ([req.query.name, fingerprint, score, time].some(val => val == null)) {
      res.sendStatus(400);
      return;
    }
    const name = req.query.name.slice(0, config.max_name_length);
    console.log(name);

    if (fingerprint !== get_fingerprint(name, score, time)) {
      res.sendStatus(403);
      return;
    }

    db.add_score(name, score, time);
    res.sendStatus(201);
  });

module.exports = router;

