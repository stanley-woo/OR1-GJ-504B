export type HistoryRange = "1D" | "1W" | "1M" | "3M" | "1Y";

export type MarketSymbol = {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
};

export type MarketQuote = {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
};

export type MarketCandle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
