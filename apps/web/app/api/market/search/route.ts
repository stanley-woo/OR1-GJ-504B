import { NextRequest, NextResponse } from "next/server";
import { getMarketDataProvider, MarketSymbol } from "@/lib/market-data";

export async function GET(req: NextRequest) {
    const US_EXCHANGES = ["NASDAQ", "NYSE", "NYSE Arca", "NYSE American", "CBOE"]
    const q = req.nextUrl.searchParams.get("q");

    if (!q) {
        return NextResponse.json({ results: [] });
    }

    try {
        const provider = getMarketDataProvider();
        const results = await provider.searchSymbols(q);
        const filtered = results.filter((item) => item.currency === "USD" && US_EXCHANGES.includes(item.exchange) && !item.symbol.endsWith("XX"));

        const map = new Map<string, MarketSymbol>();
        for (const item of filtered) {
            if (!map.has(item.symbol)) {
                map.set(item.symbol, item);
            }
        }
        
        return NextResponse.json({ results: Array.from(map.values()) });
    } catch (err) {
        console.error("[market/search]", err);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}