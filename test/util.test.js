const {get_fingerprint} = require("../src/util.js");

test("creates a valid fingerprint", () => {
  expect(get_fingerprint("john", 100, 42, "secret"))
    .toEqual("a4bd85d7621768dfc61220572792e0af4f48ec10d3be97319e452e8d07d1c244"); // this is the sha256 hash for 'john10042secret'
});
