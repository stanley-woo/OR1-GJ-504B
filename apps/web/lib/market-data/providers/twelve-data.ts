import type { MarketDataProvider } from "../provider";
import type {
  HistoryRange,
  MarketCandle,
  MarketQuote,
  MarketSymbol,
} from "../types";

const HISTORY_RANGE_PARAMS : Record<HistoryRange, TwelveDataHistoryParams> = {
    "1D": { interval: "5min", outputsize: "78" },
    "1W": { interval: "30min", outputsize: "65" },
    "1M": { interval: "1day", outputsize: "22" },
    "3M": { interval: "1day", outputsize: "66" },
    "1Y": { interval: "1week", outputsize: "52"},
};


type TwelveDataErrorResponse = {
  code: number;
  message: string;
  status: "error";
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


type TwelveDataQuoteSuccessResponse = {
    symbol: string;
    name: string;
    exchange: string;
    mic_code? : string;
    currency : string;
    datetime? : string;
    timestamp? : string;
    open?: string;
    high?: string;
    low?: string;
    close: string;
    volume?: string;
    previous_close: string;
    change: string;
    percent_change: string;
    average_volume?: string;
    is_market_open?: boolean;
    fifty_two_week?: {
        low: string;
        high: string;
        low_change: string;
        high_change: string;
        low_change_percent: string;
        high_change_percent: string;
        range: string;
    };
    status: "ok";
};


type TwelveDataQuoteResponse = TwelveDataQuoteSuccessResponse | TwelveDataErrorResponse;

type TwelveDataHistoryParams = {
    interval: string;
    outputsize: string;
};

type TwelveDataTimeSeriesMeta = {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
};

type TwelveDataTimeSeriesValue = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
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

  private mapSymbol(raw: TwelveDataSymbolSearchItem): MarketSymbol {
    return {
      symbol: raw.symbol,
      name: raw.instrument_name,
      exchange: raw.exchange,
      currency: raw.currency ?? "USD",
    }; 
  }

  private mapQuote(raw : TwelveDataQuoteSuccessResponse) : MarketQuote {
    return {
        symbol: raw.symbol,
        name: raw.name,
        exchange: raw.exchange,
        currency: raw.currency,
        price: this.parseNumber(raw.close, "price"),
        previousClose: this.parseNumber(raw.previous_close, "previousClose"),
        change: this.parseNumber(raw.change, "change"),
        changePercent: this.parseNumber(raw.percent_change, "changePercent"),
    };
  }

  private mapRange(range: HistoryRange) : TwelveDataHistoryParams {
    return HISTORY_RANGE_PARAMS[range];
  }

  private mapCandle(raw: TwelveDataTimeSeriesValue) : MarketCandle {
    return {
        time: raw.datetime,
        open: this.parseNumber(raw.open, "open"),
        high: this.parseNumber(raw.high, "high"),
        low: this.parseNumber(raw.low, "low"),
        close: this.parseNumber(raw.close, "close"),
        volume: this.parseNumber(raw.volume, "volume"),
    };
  }



  async searchSymbols(query: string): Promise<MarketSymbol[]> {
    const queryTrim = query.trim();
    if (queryTrim === "") {
      return [];
    }
    const data = await this.fetchJson<TwelveDataSymbolSearchResponse>("/symbol_search", { symbol: queryTrim });
    
    if (!("data" in data)) {
      throw new Error(data.message ?? "Twelve Data symbol search failed.");
    }

    return data.data.map((item) => this.mapSymbol(item));
  }

  async getQuote(symbol: string): Promise<MarketQuote> {
    const symbol_up = symbol.trim().toUpperCase();

    if (symbol_up === "") {
        throw new Error("Invalid symbol string.");
    }

    const data = await this.fetchJson<TwelveDataQuoteResponse>("/quote", { 
        symbol: symbol_up,
        exchange: "NASDAQ",
    });

    if (!("symbol" in data)) {
        throw new Error(data.message ?? "Twelve Data getQuote failed.");
    }

    return this.mapQuote(data);
  }

  async getHistory(symbol: string, range: HistoryRange): Promise<MarketCandle[]> {
    const symbol_up = symbol.trim().toUpperCase();
    const query_range = this.mapRange(range);

    if (symbol_up == "") {
        throw new Error("Invalid symbol string.");
    }

    const data = await this.fetchJson<TwelveDataTimeSeriesResponse>("/time_series", 
        { 
            symbol: symbol_up,
            interval: query_range.interval,
            outputsize: query_range.outputsize,
            exchange: "NASDAQ",
        });

    if (!("meta" in data)) {
        throw new Error(data.message ?? "Twelve Data getHistory failed.");
    }

    const raw_data = data.values;

    return raw_data.map((item) => this.mapCandle(item)).reverse();

  }
}
