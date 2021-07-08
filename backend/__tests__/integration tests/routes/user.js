const request = require("supertest");

const server = require("../../../index");
const { generateJwtToken } = require("../../../routes/user");
const User = require("../../../models/user");

const payload = { email: "bala@gmail.com", password: "abc@123" };
describe("login", () => {
  afterEach(async () => {
    await User.remove(payload);
    await server.close();
  });

  const token = generateJwtToken(payload);

  it("checks if it returns 200 and returns a jwt if everything is ok", async () => {
    const res = await request(server).post("/user/").send(payload);
    expect(res.status).toBe(200);
    expect(res.text).toMatch(token);
  });
});
