import type EventHandlerInterface from "../../@shared/event-handler.interface";
import type CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerHasAddressPendingHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const { id } = event.eventData.customer;

    console.log(
      `Sending email to new customer with id: ${id} to add their address`
    ); // Sending to RabbitMQ (for example)
  }
}
