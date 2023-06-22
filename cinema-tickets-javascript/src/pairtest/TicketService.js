import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #nrAdultTicketsRequested = 0;
  #nrChildTicketsRequested = 0;
  #nrInfantTicketsRequested = 0;

  purchaseTickets(accountId, ...ticketTypeRequests) {
    console.log("hELLO AGAIN");
    if (
      this.#isValidAccountId(accountId) &&
      this.#areValidTicketTypeRequests(ticketTypeRequests)
    ) {
      this.#getTicketTypeQuantitiesRequested(ticketTypeRequests);
      this.#validateTicketTypeQuantitiesRequested();

      const ticketPaymentService = new TicketPaymentService();
      ticketPaymentService.makePayment(123, 1000);

      return true;
    }
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
      console.log("Hello knobby");
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

      console.log("Num Adult tickets" + this.#nrAdultTicketsRequested);
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

    if ((this.#nrAdultTicketsRequested === 0)) {
      throw new InvalidPurchaseException(
        "You must buy at least one adult ticket to purchase child or infant tickets"
      );
    }

    if ((this.#nrInfantTicketsRequested > this. #nrAdultTicketsRequested)){
      throw new InvalidPurchaseException(
        "You must buy at least one adult ticket for each infant ticket"
      );
    }
  }
}
