import type EventInterface from "../../@shared/event/event.interface";

interface CustomerChangedAddressEventData {
  customer: {
    id: string;
    oldAddress: string;
    newAddress: string;
  };
}

export default class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: CustomerChangedAddressEventData;

  constructor(eventData: CustomerChangedAddressEventData) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}
