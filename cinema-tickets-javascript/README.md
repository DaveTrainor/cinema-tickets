# Readme

## Setup
- the root of the project is cinema-tickets-javascript; setup and test commands should be run here (not the parent directory cinema-tickets)
- install with `npm install`
- the test suite can be run with `npm test`

## Assumptions
- One adult can accompany many children
- Each infant needs an accompanying adult (to share a seat with)

## Limitations
- the test suite should be expanded to cover more edge cases and 'happy path' scenarios
- error handling is basic and should be improveded to return an error message in place of the booking object currently returned
- real payment system and seat reservation end points would likely need to be called asynchronously