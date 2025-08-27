export default interface OrderInterface<T> {
  get id(): string
  get customerId(): string
  get items(): T[]
}