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

  it("should list all customers", async () => {
    await request(app)
      .post("/customers")
      .send({
        name: "John 1",
        address: {
          street: "Street 1",
          number: 1,
          zipCode: "11111",
          city: "City 1",
        },
      });

    await request(app)
      .post("/customers")
      .send({
        name: "John 2",
        address: {
          street: "Street 2",
          number: 2,
          zipCode: "22222",
          city: "City 2",
        },
      });
    const listResponse = await request(app).get("/customers").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    expect(customer1.name).toBe("John 1");
    expect(customer1.address.street).toBe("Street 1");
    expect(customer1.address.number).toBe(1);
    expect(customer1.address.city).toBe("City 1");
    expect(customer1.address.zipCode).toBe("11111");

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("John 2");
    expect(customer2.address.street).toBe("Street 2");
    expect(customer2.address.number).toBe(2);
    expect(customer2.address.city).toBe("City 2");
    expect(customer2.address.zipCode).toBe("22222");
  });
});
