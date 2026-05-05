import type {
  HistoryRange,
  MarketCandle,
  MarketQuote,
  MarketSymbol,
} from "./types";

export interface MarketDataProvider {
  searchSymbols(query: string): Promise<MarketSymbol[]>;
  getQuote(symbol: string): Promise<MarketQuote>;
  getHistory(symbol: string, range: HistoryRange): Promise<MarketCandle[]>;
}
