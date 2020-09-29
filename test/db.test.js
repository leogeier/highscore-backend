const DB = require("../src/db.js");

let db;

beforeEach(async () => {
  db = new DB();
  await db.add_score("angela", 100, 123);
  await db.add_score("bob", 200, 1234);
  await db.add_score("chris", 300, 12345);
  await db.add_score("dana", 5, 1);
  await db.add_score("eric", 5, 2);
  await db.add_score("fiona", 5, 2);
});

test("retrieves high scores", async () => {
  expect(await db.get_highscores(3)).toEqual([
    {name: "chris", score: 300, time: 12345},
    {name: "bob", score: 200, time: 1234},
    {name: "angela", score: 100, time: 123},
  ]);
});

test("does not return more scores than there are in the db", async () => {
  const highscores = await db.get_highscores(1000);
  expect(highscores).toHaveLength(6);
});

test("equals high scores are tie broken by submission time first and name second", async () => {
  const highscores = await db.get_highscores(6);
  expect(highscores[3].name).toEqual("dana");
  expect(highscores[4].name).toEqual("eric");
  expect(highscores[5].name).toEqual("fiona");
});

test("gets the current rank of a given row on the leaderboard", async () => {
  const row_id = await db.add_score("zac", 50, 0);
  expect(await db.get_rank(row_id)).toEqual(4);
});

test("returns the rank -1 if an invalid row id was given", async () => {
  expect(await db.get_rank(10000)).toEqual(-1);
  expect(await db.get_rank(-1)).toEqual(-1);
})
