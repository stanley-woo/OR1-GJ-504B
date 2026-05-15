import { NextRequest, NextResponse } from "next/server";
import { getMarketDataProvider } from "@/lib/market-data";
import { HistoryRange } from "@/lib/market-data/types";

const VALID_RANGES = ["1D", "1W", "1M", "3M", "1Y"];

export async function GET(req: NextRequest, { params }: { params: Promise<{ symbol: string }>}) {
    const symbol = (await params).symbol;
    const range = req.nextUrl.searchParams.get("range") ?? "1D";
    if (!VALID_RANGES.includes(range)) {
        return NextResponse.json({ error: "Invalid range for history fetch."}, { status: 400 });
    }

    const validatedRange = range as HistoryRange;
    try {
        const provider = getMarketDataProvider();
        const candles = await provider.getHistory(symbol, validatedRange);
        return NextResponse.json({ candles });
    } catch {
        return NextResponse.json({ error: "History fetch failed. "}, { status: 500 })
    }
}