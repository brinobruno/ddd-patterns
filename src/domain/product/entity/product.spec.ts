import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
      return product;
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
      return product;
    }).toThrow("Name is required");
  });

  it("should throw error when price is less zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1);
      return product;
    }).toThrow("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 150);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should get id", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product.id).toBe("1");
  });

  it("should get name", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product.name).toBe("Product 1");
  });

  it("should get price", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product.price).toBe(100);
  });
});
