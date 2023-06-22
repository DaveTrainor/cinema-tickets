import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("accountId validation", () => {
  const ticketService = new TicketService();
  const ticketTypeRequest = new TicketTypeRequest("ADULT", 5);
  test("valid accountId is accepted", () => {
    // const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(123, ticketTypeRequest);
    }).not.toThrow(InvalidPurchaseException);
  });
  test("non-numerical accountId throws error", () => {
    // const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets("123", ticketTypeRequest);
    }).toThrow(InvalidPurchaseException);
  });
  test("0 accountId throws error", () => {
    // const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(0, ticketTypeRequest);
    }).toThrow(InvalidPurchaseException);
  });
});

describe("ticketTypeRequests validation", () => {
  const ticketService = new TicketService();
  const ticketRequest1 = new TicketTypeRequest("ADULT", 5);
  const ticketRequest2 = new TicketTypeRequest("INFANT", 2);
  test("valid ticketTypeRequests are accepted", () => {
    const ticketRequest3 = new TicketTypeRequest("CHILD", 6);
    expect(() => {
      ticketService.purchaseTickets(
        123,
        ticketRequest1,
        ticketRequest2,
        ticketRequest3
      );
    }).not.toThrow(InvalidPurchaseException);
  });
  test("invalid ticketTypeRequests are not accepted", () => {
    const ticketRequest4 = ("CHILD", 6);
    expect(() => {
      ticketService.purchaseTickets(
        123,
        ticketRequest1,
        ticketRequest2,
        ticketRequest4
      );
    }).toThrow(InvalidPurchaseException);
  });
});
