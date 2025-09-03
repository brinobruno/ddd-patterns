import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer E2E Test", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "Street 1",
          number: 123,
          zipCode: "12345",
          city: "City",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.zipCode).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John",
    });

    expect(response.status).toBe(500);
  });
});
