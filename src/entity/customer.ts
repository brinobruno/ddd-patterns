import Address from "./address";

// entity
// - customer.ts (business rules)
// infra
//   entity/model
//     - customer.ts (get/set (persistence, db))

// Customer Aggregate = Customer + Address
// Order Aggregate = Order + Item + Customer ID (!!!)
// weak/strong coupling/link

export default class Customer {
  private readonly _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    this.validateName(this._name);
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      throw new Error("Name is required");
    }
  }

  name(): string {
    return this._name;
  }

  changeName(name: string): void {
    const previousName = this._name;
    this._name = name;

    try {
      this.validate();
    } catch (e) {
      this._name = previousName;
      throw e;
    }
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error("Address is required to activate the customer");
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  setAddress(address: Address): void {
    this._address = address;
  }
}
