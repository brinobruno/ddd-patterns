import type EventInterface from "./event.interface";

// event has to implement EventInterface, and defaults to EventInterface
export default interface EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void;
}
