import type { MarketDataProvider } from "./provider";
import { TwelveDataProvider } from "./providers/twelve-data";

export function getMarketDataProvider(): MarketDataProvider {
  return new TwelveDataProvider();
}
