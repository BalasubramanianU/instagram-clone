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
      await UserWithEmail.deleteOne({ userName: payloadWithEmail.userName });
      await server.close();
    });

    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const res = await request(server)
        .post("/user/signup")
        .send(payloadWithEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
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
      await UserWithNumber.deleteOne({
        mobileNumber: payloadWithNumber.mobileNumber,
      });
      await server.close();
    });

    it("checks if it returns 200 and returns a jwt auth header if everything is ok", async () => {
      const res = await request(server)
        .post("/user/signup")
        .send(payloadWithNumber);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
    });
  });

  const payloadWithName = {
    email: "tt@gmail.com",
    fullName: "test",
    userName: "_test__",
    password: "abc@123",
  };

  describe("signup with mobile number and already existing user name", () => {
    beforeEach(() => {
      server = require("../../../index");
    });

    afterEach(async () => {
      await server.close();
    });

    it("checks if it returns 400 and returns a error message if the user name already exists", async () => {
      const res = await request(server)
        .post("/user/signup")
        .send(payloadWithName);

      expect(res.status).toBe(400);
      expect(res.text).toMatch("User name already exists");
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
      const res = await request(server)
        .post("/user/login")
        .send(payloadWithEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
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
      const res = await request(server)
        .post("/user/login")
        .send(payloadWithNumber);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
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
      const res = await request(server)
        .post("/user/login")
        .send(nameInsideMobileNo);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
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
      const res = await request(server)
        .post("/user/login")
        .send(nameInsideEmail);

      expect(res.status).toBe(200);
      expect(res.header).toHaveProperty("x-auth-header");
    });
  });
});
