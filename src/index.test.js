const request = require("supertest");
const app = require("./index");

describe("API Endpoints", () => {
  describe("GET /health", () => {
    it("should return status ok", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("ok");
    });
  });

  describe("GET /", () => {
    it("should return information about the API", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
      expect(response.body.version).toBeDefined();
    });
  });

  describe("POST /calculate", () => {
    it("should add two numbers", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 5, b: 3, operation: "add" });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(8);
    });

    it("should subtract two numbers", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 10, b: 4, operation: "subtract" });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(6);
    });

    it("should multiply two numbers", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 3, b: 4, operation: "multiply" });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(12);
    });

    it("should divide two numbers", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 10, b: 2, operation: "divide" });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(5);
    });

    it("should return an error when dividing by zero", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 10, b: 0, operation: "divide" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return an error for an invalid operation", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: 5, b: 3, operation: "invalid" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it("should return an error when a or b are not numbers", async () => {
      const response = await request(app)
        .post("/calculate")
        .send({ a: "5", b: 3, operation: "add" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});
