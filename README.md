# highscore-backend

A tiny NodeJS app that records scores, for e.g. a jam game.

## Setup

1. Change the secret in `src/config.json`
2. `npm i --only=prod`
3. `npm start`

## Interface:

###### `POST /highscore?name=john&score=&100&time=1500&fingerprint=xxx`:

Creates a new score entry for john with a score of 100 and a time of 1500 and returns the ID of the newly added score as JSON.

Time is intended to be a UNIX timestamp and is currently only used for breaking ties (score > time > name).
The fingerprint must be a hexadecimal SHA-256 hash of the other three values and the secret concatenated in this order: `name + score + time + secret`.
For example, if the secret is `friendship`, the concatenated value would be `john1001500friendship`, resulting in this fingerprint: `c6d24c956ef776551d5536d6457d2d15652c79099989b2019ab78717cb4485d3`.
If the fingerprint in the request does not match the values, the score entry will not be accepted.

This isn't perfect security by far, but should be good for small jam games and such.

###### `GET /highscore?count=5`:

Returns the top 5 score entries as JSON.

###### `GET /rank?id=17`

Returns the rank of the score entry with ID 17 relative to all other scores as JSON.
I.e. if this was the third best score, it would return a rank of 3.
