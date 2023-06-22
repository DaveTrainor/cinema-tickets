import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    if (
      this.#isValidAccountId(accountId) &&
      this.#areValidTicketTypeRequests(ticketTypeRequests)
    ) {
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
  }
}
