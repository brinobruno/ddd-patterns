import type EventHandlerInterface from "../../@shared/event-handler.interface";
import type CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const { name } = event.eventData.customer;

    console.log(`Sending email to new customer ${name}`); // Sending to RabbitMQ (for example)
  }
}
