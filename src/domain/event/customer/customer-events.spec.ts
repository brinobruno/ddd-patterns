import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerChangedAddressEvent from "./customer-changed-address.event";

import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-email-when-customer-is-created";
import SendEmailWhenCustomerHasAddressPendingHandler from "./handler/send-email-when-customer-has-address-pending";
import SendEmailWhenCustomerChangedAddressHandler from "./handler/send-email-when-customer-changed-address";

describe("Customer domain events tests", () => {
  it("should register event handlers for CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const handler1 = new SendEmailWhenCustomerIsCreatedHandler();
    const handler2 = new SendEmailWhenCustomerHasAddressPendingHandler();

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toHaveLength(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(
      handler1
    );
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContain(
      handler2
    );
  });

  it("should notify all handlers for CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const handler1 = new SendEmailWhenCustomerIsCreatedHandler();
    const handler2 = new SendEmailWhenCustomerHasAddressPendingHandler();

    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    const event = new CustomerCreatedEvent({
      customer: { id: "123", name: "Bruno" },
    });

    eventDispatcher.notify(event);

    expect(spyHandler1).toHaveBeenCalledTimes(1);
    expect(spyHandler2).toHaveBeenCalledTimes(1);
  });

  it("should register and notify handler for CustomerChangedAddressEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenCustomerChangedAddressHandler();
    const spyHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", handler);

    const event = new CustomerChangedAddressEvent({
      customer: {
        id: "123",
        oldAddress: "Old Street 1",
        newAddress: "New Avenue 99",
      },
    });

    eventDispatcher.notify(event);

    expect(spyHandler).toHaveBeenCalledTimes(1);
    expect(spyHandler).toHaveBeenCalledWith(event);
  });

  it("should unregister a CustomerCreatedEvent handler", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toHaveLength(1);

    eventDispatcher.unregister("CustomerCreatedEvent", handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toHaveLength(0);
  });

  it("should clear all handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const handler1 = new SendEmailWhenCustomerIsCreatedHandler();
    const handler2 = new SendEmailWhenCustomerHasAddressPendingHandler();

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toHaveLength(2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });
});
