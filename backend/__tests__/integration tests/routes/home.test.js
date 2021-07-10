const request = require("supertest");

const { generateJwtToken } = require("../../../utils/user");

let server;
describe("home route", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(() => {
    server.close();
  });

  payload = "Data to be signed using test env. jwt key";

  it("checks if it returns 200 when a valid jwt token is passed", async () => {
    const token = generateJwtToken(payload);
    const res = await await request(server)
      .post("/home/")
      .set("x-auth-header", token);

    expect(res.status).toBe(200);
  });
});
