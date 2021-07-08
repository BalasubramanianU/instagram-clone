const request = require("supertest");

const index = require("../../index");
const { generateJwtToken } = require("../../routes/user");

const config = require("config");
const jwt = require("jsonwebtoken");

const payload = { email: "bala@gmail.com", password: "abc@123" };
describe("server test", () => {
  var server;
  beforeEach(() => {
    server = index.server;
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
    expect(generateJwtToken(payload)).toMatch(
      jwt.sign(payload, config.get("jwtKey"))
    );
  });
});

describe("login", () => {
  const token = generateJwtToken(payload);

  it("checks if it returns 200 and returns a jwt if everything is ok", async () => {
    const res = await request(index.server).post("/user/").send(payload);
    expect(res.status).toBe(200);
    expect(res.text).toMatch(token);
  });
});
