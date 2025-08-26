import type EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import type CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendEmailWhenCustomerChangedAddressHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    const { id, oldAddress, newAddress } = event.eventData.customer;

    console.log(
      `Sending email confirming user ${id} change address from ${oldAddress} to ${newAddress}`
    ); // Sending to RabbitMQ (for example)
  }
}
