const sqlite3 = require("sqlite3");

class DB {
  constructor(path = ":memory:") {
    this.db = new sqlite3.Database(path);
    
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS scores
        (id INTEGER PRIMARY KEY,
         name TEXT,
         score INTEGER,
         time INTEGER);
      `);

      this.insert_row = this.db.prepare(`
        INSERT INTO scores
        (name, score, time)
        VALUES (?, ?, ?);
      `);

      this.select_highscores = this.db.prepare(`
        SELECT name, score, time
        FROM scores
        ORDER BY score DESC, time, name
        LIMIT ?;
      `);

      this.select_row_rank = this.db.prepare(`
        SELECT ranked.rank
        FROM
          (SELECT RANK() OVER(ORDER BY score DESC, time, name) rank, id
          FROM scores) ranked
        WHERE ranked.id = ?;
      `);
    });
  }

  async add_score(name, score, time) {
    return await new Promise((resolve, reject) => {
      this.insert_row.run(name, score, time, function(err) {
        if (err != null) reject(err);
        resolve(this.lastID);
      });
    });
  }

  async get_highscores(count) {
    return await new Promise((resolve, reject) => {
      this.select_highscores.all(count, (err, rows) => {
        if (err != null) reject(err);
        resolve(rows);
      });
    });
  }

  async get_rank(row_id) {
    return await new Promise((resolve, reject) => {
      this.select_row_rank.get(row_id, (err, result) => {
        if (err != null) reject(err);
        resolve(result.rank);
      });
    });
  }
}

 module.exports = DB;
