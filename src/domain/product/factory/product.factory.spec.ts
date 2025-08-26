import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type A 'regular'", () => {
    const product = ProductFactory.create("a", "product A", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create("b", "product B", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });
});
