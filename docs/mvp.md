# MVP Scope

## V1 Goals

1. Authentication and seeded paper cash
   Each new user starts with `$10,000` in paper cash. Authentication should feel secure and production-like, but real money movement is out of scope.
2. Stock search
   Users can search U.S. equities by symbol or company name.
3. Stock detail page
   Users can view a quote, a simple price chart, and basic company context.
4. Portfolio holdings
   Users can view current cash, positions, market value, and profit/loss.
5. Buy and sell flow
   Users can place market buy and sell orders using paper money.
6. Order history
   Users can review past filled or rejected orders.
7. Portfolio performance snapshots
   The system stores snapshots so historical performance can be shown without recalculating everything from scratch each time.

## V1 Simplifications

- U.S. equities only
- Market orders only
- Immediate fills at the latest known price
- No options
- No real money deposits or withdrawals
- No social features
- No advanced charting tools
- No complex matching engine

## V2 Candidates

- Limit orders
- Watchlists
- Price alerts
- Mobile client
- Better analytics and more detailed portfolio charts
- More production-grade async processing and observability
