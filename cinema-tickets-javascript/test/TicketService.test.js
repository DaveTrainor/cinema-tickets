import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";



const adultTicketRequest = new TicketTypeRequest("ADULT", 5);
const infantTicketRequest = new TicketTypeRequest("INFANT", 2);
const childTicketRequest = new TicketTypeRequest("CHILD", 6)
const largeAdultTicketRequest = new TicketTypeRequest("ADULT", 19);
const largeInfantTicketRequest = new TicketTypeRequest("INFANT", 6);
const invalidticketRequest = ("CHILD", 6);

describe("accountId validation", () => {
  const ticketService = new TicketService();
  const ticketTypeRequest = new TicketTypeRequest("ADULT", 5);

  test("valid accountId is accepted", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(123, ticketTypeRequest);
    }).not.toThrow(InvalidPurchaseException);
  });

  test("non-numerical accountId throws error", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets("123", ticketTypeRequest);
    }).toThrow(InvalidPurchaseException);
  });

  test("0 accountId throws error", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(0, ticketTypeRequest);
    }).toThrow(InvalidPurchaseException);
  });
});

describe("validation of ticketTypeRequests", () => {
  test("valid ticketTypeRequest objects are accepted", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        adultTicketRequest,
        infantTicketRequest,
        childTicketRequest
      );
    }).not.toThrow(InvalidPurchaseException);
  });

  test("invalid ticketTypeRequest objects are not accepted", () => {
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        adultTicketRequest,
        infantTicketRequest,
        invalidticketRequest
      );
    }).toThrow(InvalidPurchaseException);
  })

  test('error thrown if number of tickets requested is not between 1 and 20', ()=>{
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        adultTicketRequest,
        infantTicketRequest,
        largeAdultTicketRequest
      );
    }).toThrow(InvalidPurchaseException);
  })

  test('no error thrown if number of tickets is between 1 and 20', () =>{
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        adultTicketRequest,
        infantTicketRequest,
        childTicketRequest
      );
    }).not.toThrow(InvalidPurchaseException);
  })

  test('error thrown if no adult ticket requested', ()=>{
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        infantTicketRequest,
        childTicketRequest
      );
    }).toThrow(InvalidPurchaseException);
  })

  test ('error thrown if number of infants exceeds number of adults', () =>{
    const ticketService = new TicketService();
    expect(() => {
      ticketService.purchaseTickets(
        123,
        adultTicketRequest,
        largeInfantTicketRequest,
        childTicketRequest
      );
    }).toThrow(InvalidPurchaseException);
  })

  

});

