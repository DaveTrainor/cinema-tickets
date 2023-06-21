import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";

describe("accountId validation", () => {
  test("valid accountId is accepted", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(123, ("ADULT", 5));
    }).not.toThrow(InvalidPurchaseException);
  });
  test("non-numerical accountId throws error", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets("123", ("ADULT", 5));
    }).toThrow(InvalidPurchaseException);
  });
  test("0 accountId throws error", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(0, ("ADULT", 5));
    }).toThrow(InvalidPurchaseException);
  });
});
