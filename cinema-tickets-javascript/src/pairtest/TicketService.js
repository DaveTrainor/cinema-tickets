import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #nrAdultTicketsRequested = 0;
  #nrChildTicketsRequested = 0;
  #nrInfantTicketsRequested = 0;

  #ticketTypeCostsInPence = { ADULT: 2000, CHILD: 1000, INFANT: 0 };

  purchaseTickets(accountId, ...ticketTypeRequests) {

    const ticketBooking = {
      nrAdultTickets: 0,
      nrChildTickets: 0,
      nrInfantTickets: 0,
      nrOfSeatsReserved: 0,
    };

    this.#isValidAccountId(accountId);
    this.#areValidTicketTypeRequests(ticketTypeRequests);
    this.#getTicketTypeQuantitiesRequested(ticketTypeRequests);
    this.#validateTicketTypeQuantitiesRequested();

    const nrOfSeatsRequested = this.#getNrOfSeatsRequested();
    const totalTicketCostInPounds = this.#getTotalTicketCostInPounds();

    const seatReservationService = new SeatReservationService();
    seatReservationService.reserveSeat(accountId, nrOfSeatsRequested);

    const ticketPaymentService = new TicketPaymentService();
    ticketPaymentService.makePayment(accountId, totalTicketCostInPounds);

    ticketBooking.nrOfSeatsReserved = nrOfSeatsRequested;
    ticketBooking.nrAdultTickets = this.#nrAdultTicketsRequested;
    ticketBooking.nrChildTickets = this.#nrChildTicketsRequested;
    ticketBooking.nrInfantTickets = this.#nrInfantTicketsRequested;
    ticketBooking.totalTicketCostInPounds = totalTicketCostInPounds;

    return ticketBooking;
  }

  #isValidAccountId(accountId) {
    if (typeof accountId != "number" || accountId <= 0) {
      throw new InvalidPurchaseException(
        "accountId must be a number greater than zero"
      );
    }
    return true;
  }

  #areValidTicketTypeRequests(ticketTypeRequests) {
    ticketTypeRequests.forEach((ticket) => {
      if (!(ticket instanceof TicketTypeRequest)) {
        throw new InvalidPurchaseException(
          "Ticket request object must be an instance of ticketTypeRequest"
        );
      }
    });
    return true;
  }

  #getTicketTypeQuantitiesRequested(ticketTypeRequests) {
    ticketTypeRequests.forEach((ticket) => {
      const ticketType = ticket.getTicketType();
      switch (ticketType) {
        case "ADULT":
          this.#nrAdultTicketsRequested += ticket.getNoOfTickets();
          break;
        case "CHILD":
          this.#nrChildTicketsRequested += ticket.getNoOfTickets();
          break;
        case "INFANT":
          this.#nrInfantTicketsRequested += ticket.getNoOfTickets();
          break;
      }
    });
  }

  #validateTicketTypeQuantitiesRequested() {
    const totalNrTicketsRequested =
      this.#nrAdultTicketsRequested +
      this.#nrChildTicketsRequested +
      this.#nrInfantTicketsRequested;

    if (totalNrTicketsRequested < 1 || totalNrTicketsRequested > 20) {
      throw new InvalidPurchaseException(
        "Number of tickets requested must be between 1 and 20"
      );
    }

    if (this.#nrAdultTicketsRequested === 0) {
      throw new InvalidPurchaseException(
        "You must buy at least one adult ticket to purchase child or infant tickets"
      );
    }

    if (this.#nrInfantTicketsRequested > this.#nrAdultTicketsRequested) {
      throw new InvalidPurchaseException(
        "You must buy at least one adult ticket for each infant ticket"
      );
    }
  }

  #getNrOfSeatsRequested() {
    const numberOfSeatsRequested =
      this.#nrAdultTicketsRequested + this.#nrChildTicketsRequested;
    return numberOfSeatsRequested;
  }

  #getTotalTicketCostInPounds() {
    const totalTicketCost =
      (this.#nrAdultTicketsRequested * this.#ticketTypeCostsInPence["ADULT"] +
        this.#nrChildTicketsRequested * this.#ticketTypeCostsInPence["CHILD"]) /
      100;
    return totalTicketCost;
  }
}
