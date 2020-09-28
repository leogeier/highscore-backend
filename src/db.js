const sqlite3 = require("sqlite3");

class DB {
  constructor(path = ":memory:") {
    this.db = new sqlite3.Database(path);
    
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS scores (entry INTEGER PRIMARY KEY, name TEXT, score INTEGER, time INTEGER)");
    });
  }

  add_score(name, score, time) {

  }

  get_highscores(count) {

  }

  get_scores_around(count_radius) {

  }
}
 module.exports = DB;
