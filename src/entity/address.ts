// Value object
// Don't have an identity
// Can be replaced by another instance with the same value
// Can be used in entities
// Example: Address, Money, DateRange

// By itself, just like Customer, doesn't have anything to do with DATABASE.
// It does not even have to be a table in the database.

export default class Address {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _number: number = 0;
  private readonly _zipCode: string;

  constructor(street: string, number: number, city: string, zipCode: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zipCode = zipCode;

    this.validate();
  }

  validate(): void {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zipCode.length === 0) {
      throw new Error("Zip code is required");
    }
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._city}, ${this._zipCode}`;
  }
}
