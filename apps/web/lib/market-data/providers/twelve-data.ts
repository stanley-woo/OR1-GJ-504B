import type { MarketDataProvider } from "../provider";
import type {
  HistoryRange,
  MarketCandle,
  MarketQuote,
  MarketSymbol,
} from "../types";

type TwelveDataErrorResponse = {
  code?: number;
  message?: string;
  status?: "error";
};

type TwelveDataSymbolSearchItem = {
  symbol: string;
  instrument_name: string;
  exchange: string;
  mic_code?: string;
  exchange_timezone?: string;
  instrument_type?: string;
  country?: string;
  currency?: string;
};

type TwelveDataSymbolSearchResponse =
  | {
      data: TwelveDataSymbolSearchItem[];
      status: "ok";
    }
  | TwelveDataErrorResponse;

type TwelveDataQuoteResponse =
  | {
      symbol: string;
      name: string;
      exchange: string;
      mic_code?: string;
      currency?: string;
      datetime?: string;
      timestamp?: string;
      open?: string;
      high?: string;
      low?: string;
      close?: string;
      volume?: string;
      previous_close?: string;
      change?: string;
      percent_change?: string;
      average_volume?: string;
      is_market_open?: boolean;
      fifty_two_week?: {
        low?: string;
        high?: string;
        low_change?: string;
        high_change?: string;
        low_change_percent?: string;
        high_change_percent?: string;
        range?: string;
      };
      status?: "ok";
    }
  | TwelveDataErrorResponse;

type TwelveDataTimeSeriesMeta = {
  symbol: string;
  interval: string;
  currency?: string;
  exchange_timezone?: string;
  exchange?: string;
  mic_code?: string;
  type?: string;
};

type TwelveDataTimeSeriesValue = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume?: string;
};

type TwelveDataTimeSeriesResponse =
  | {
      meta: TwelveDataTimeSeriesMeta;
      values: TwelveDataTimeSeriesValue[];
      status: "ok";
    }
  | TwelveDataErrorResponse;

export class TwelveDataProvider implements MarketDataProvider {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    const apikey = process.env.TWELVE_DATA_API_KEY;

    if (!apikey) {
      throw new Error("Twelve Data API Key is not set");
    }

    this.apiKey = apikey;
    this.baseUrl = process.env.TWELVE_DATA_BASE_URL ?? "https://api.twelvedata.com";
  }

  private buildUrl(path: string, params: Record<string, string>): string {
    const url = new URL(path, this.baseUrl);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    url.searchParams.set("apikey", this.apiKey);

    return url.toString();
  }

  private async fetchJson<T>(path: string, params: Record<string, string>): Promise<T> {
    const response = await fetch(this.buildUrl(path, params), { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Twelve Data request failed with ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  private parseNumber(value: string | undefined, fieldName: string): number {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      throw new Error(`Invalid number for ${fieldName}`);
    }

    return number;
  }

  async searchSymbols(query: string): Promise<MarketSymbol[]> {
    throw new Error("Not implemented");
  }

  async getQuote(symbol: string): Promise<MarketQuote> {
    throw new Error("Not implemented");
  }

  async getHistory(symbol: string, range: HistoryRange): Promise<MarketCandle[]> {
    throw new Error("Not implemented");
  }
}
