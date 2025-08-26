import type EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: unknown;

  constructor(eventData: unknown) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}
