const request = require("supertest");

const { generateJwtToken } = require("../../../utils/user");
const { UserWithEmail, UserWithNumber } = require("../../../models/user");

describe("signup route", () => {
  let server;
  const payloadWithEmail = {
    email: "test123@gmail.com",
    fullName: "test",
    userName: "__test_",
    password: "abc@123",
  };

  describe("signup with email", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await UserWithEmail.deleteOne(payloadWithEmail);
      await server.close();
    });

    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(payloadWithEmail);
      const res = await request(server)
        .post("/user/signup")
        .send(payloadWithEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });

  const payloadWithNumber = {
    mobileNumber: "123456",
    fullName: "test",
    userName: "_test_",
    password: "abc@123",
  };

  describe("signup with mobile number", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await UserWithNumber.deleteOne(payloadWithNumber);
      await server.close();
    });

    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(payloadWithNumber);
      const res = await request(server)
        .post("/user/signup")
        .send(payloadWithNumber);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });
});

describe("login route", () => {
  let server;
  const payloadWithEmail = {
    email: "test@gmail.com",
    password: "abc@123",
  };

  describe("login with email", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await server.close();
    });

    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(payloadWithEmail);
      const res = await request(server)
        .post("/user/login")
        .send(payloadWithEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });

  const payloadWithNumber = {
    mobileNumber: "12345678",
    password: "abc@123",
  };

  describe("login with mobile number", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await server.close();
    });
    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(payloadWithNumber);
      const res = await request(server)
        .post("/user/login")
        .send(payloadWithNumber);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });

  const nameInsideMobileNo = {
    userName: "__test__",
    password: "abc@123",
  };

  describe("login with user name inside mobileNumber collections in mongodb", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await server.close();
    });
    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(nameInsideMobileNo);
      const res = await request(server)
        .post("/user/login")
        .send(nameInsideMobileNo);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });
  const nameInsideEmail = {
    userName: "_test__",
    password: "abc@123",
  };

  describe("login with user name inside mobileNumber collections in mongodb", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await server.close();
    });
    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const token = generateJwtToken(nameInsideEmail);
      const res = await request(server)
        .post("/user/login")
        .send(nameInsideEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header", token);
    });
  });
});
