import Address from "./address";

describe("Address unit tests", () => {
  it("should throw error when street is empty", () => {
    expect(() => {
      const address = new Address("", 123, "City", "12345-678");
      return address;
    }).toThrow("Street is required");
  });

  it("should throw error when city is empty", () => {
    expect(() => {
      const address = new Address("Street", 123, "", "12345-678");
      return address;
    }).toThrow("City is required");
  });

  it("should throw error when number is zero", () => {
    expect(() => {
      const address = new Address("Street", 0, "City", "12345-678");
      return address;
    }).toThrow("Number is required");
  });

  it("should throw error when zip code is empty", () => {
    expect(() => {
      const address = new Address("Street", 123, "City", "");
      return address;
    }).toThrow("Zip code is required");
  });

  it("should create a valid address", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(address.toString()).toBe("Street, 123, City, 12345-678");
  });

  it("should return the correct string representation", () => {
    const address = new Address("Main St", 456, "Springfield", "98765-432");
    expect(address.toString()).toBe("Main St, 456, Springfield, 98765-432");
  });

  it("should not throw when all fields are valid", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(() => address.validate()).not.toThrow();
  });

  it("should get street", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(address.street).toBe("Street");
  });

  it("should get number", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(address.number).toBe(123);
  });

  it("should get city", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(address.city).toBe("City");
  });

  it("should get zip code", () => {
    const address = new Address("Street", 123, "City", "12345-678");
    expect(address.zipCode).toBe("12345-678");
  });
});
