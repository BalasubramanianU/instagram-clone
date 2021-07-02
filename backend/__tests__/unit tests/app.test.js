const request = require("supertest");
const jwt = require("jsonwebtoken");
const { token_secret } = require("../../config");
const app = require("../../app");

const payload = { email: "bala@gmail.com", password: "abc@123" };
describe("server test", () => {
  var server;
  beforeEach(() => {
    server = app.server;
  });
  afterEach(() => {
    server.close();
  });
  it('404 for initial get request ""', async () => {
    const res = await request(server).get("");
    expect(res.status).toBe(404);
  });
});

describe("jwt", () => {
  it("checking jwt creator function", () => {
    expect(app.generateJwtToken(payload)).toMatch(
      jwt.sign(payload, token_secret)
    );
  });
});

describe("login", () => {
  const token = app.generateJwtToken(payload);

  it("checks if it returns 200 and a jwt if everything is ok", async () => {
    const res = await request(app.server).post("").send(payload);
    expect(res.status).toBe(200);
    expect(res.text).toMatch(token);
  });
});
