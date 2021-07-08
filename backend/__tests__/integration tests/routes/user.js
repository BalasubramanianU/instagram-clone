const request = require("supertest");

const server = require("../../../index");
const { generateJwtToken } = require("../../../routes/user");
const { UserWithEmail, UserWithNumber } = require("../../../models/user");

const payloadWithEmail = {
  email: "bala@gmail.com",
  fullName: "bala",
  userName: "__bala__",
  password: "abc@123",
};
describe("signup with email", () => {
  afterEach(async () => {
    await UserWithEmail.remove(payloadWithEmail);
    await server.close();
  });

  const token = generateJwtToken(payloadWithEmail);

  it("checks if it returns 200 and returns a jwt if everything is ok", async () => {
    const res = await request(server).post("/user/").send(payloadWithEmail);
    expect(res.status).toBe(200);
    expect(res.text).toMatch(token);
  });
});

const payloadWithNumber = {
  mobileNumber: "123456",
  fullName: "bala",
  userName: "__bala__",
  password: "abc@123",
};
describe("signup with mobile number", () => {
  afterEach(async () => {
    await UserWithNumber.remove(payloadWithNumber);
    await server.close();
  });

  const token = generateJwtToken(payloadWithNumber);

  it("checks if it returns 200 and returns a jwt if everything is ok", async () => {
    const res = await request(server).post("/user/").send(payloadWithNumber);
    expect(res.status).toBe(200);
    expect(res.text).toMatch(token);
  });
});
