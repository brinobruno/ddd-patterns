import type EventInterface from "../../@shared/event/event.interface";

interface CustomerCreatedEventData {
  customer: {
    id: string;
    name: string;
  };
}

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: CustomerCreatedEventData;

  constructor(eventData: CustomerCreatedEventData) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}
