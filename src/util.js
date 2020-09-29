const config = require("./config.json");
const crypto = require("crypto");

function get_fingerprint(name, score, time, secret) {
  const concatted = name + score.toString() + time.toString() + secret;
  const sha256 = crypto.createHash("sha256");
  return sha256.update(concatted).digest("hex");
}

module.exports = {
  get_fingerprint
}
