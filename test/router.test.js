const get_score_router = require("../src/router.js");
const express = require("express");
const request = require("supertest");

let app;

beforeEach(async () => {
  app = express();
  app.use(get_score_router(":memory:", "secret"));
});

test("POST /highscore returns the id of the new row", async ()  => {
  const res = await request(app)
    .post("/highscore?name=john&score=100&time=42&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244")
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);

  expect(res.body.id).toEqual(1);
});

async function check_query_strings(endpoint, query_strings, expected_status_code, expected_body = {}) {
  for (const query_string of query_strings) {
    const res = await request(app)
      .post(`${endpoint}${query_string}`)
      .expect(expected_status_code);
    expect(res.body).toEqual(expected_body);
  }
}

test("POST /highscore solely returns 400 if parameters are missing", async () => {
  const query_strings = [
    "?score=100&time=42&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244",
    "?name=john&time=42&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244",
    "?name=john&score=100&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244",
    "?name=john&score=100&time=42"
  ];

  await check_query_strings("/highscore", query_strings, 400);
});

test("POST /highscore solely returns 400 if parameters are invalid", async () => {
  const query_strings = [
    "?name=john&score=abc&time=42&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244",
    "?name=john&score=100&time=abc&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244"
  ];

  await check_query_strings("/highscore", query_strings, 400);
});

test("POST /highscore solely returns 403 if the fingerprint is incorrect", async () => {
  const query_strings = [
    "?name=john&score=100&time=42&fingerprint=incorrect",
    "?name=karlos&score=42&time=69&fingerprint=a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244"
  ];

  await check_query_strings("/highscore", query_strings, 403);
});

// test("GET /rank returns the rank of the row with the given id", async () => {
//   throw new Error();
// });

// test("GET /rank returns 400 if the row id is missing", async () => {
//   throw new Error();
// });

// test("GET /rank returns 400 if the row id is invalid", async () => {
//   throw new Error();
// });

