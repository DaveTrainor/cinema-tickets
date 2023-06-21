import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

test("jest is running", () => {
  expect(1 + 2).toBe(3);
});

test("request object contains correct ticket details", () => {
    const ticketTypeRequest = new TicketTypeRequest('ADULT', 5);
    expect (ticketTypeRequest.getNoOfTickets()).toBe(5);
    expect (ticketTypeRequest.getTicketType()).toBe('ADULT');
});
