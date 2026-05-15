import { NextRequest, NextResponse } from "next/server";
import { getMarketDataProvider } from "@/lib/market-data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ symbol: string }>}) {
    // "await the Promise first to get the resolved object, then access .symbol on that object." 
    const symbol = (await params).symbol;

    try {
        const provider = getMarketDataProvider();
        const quote = await provider.getQuote(symbol);
        return NextResponse.json({ quote });
    } catch {
        return NextResponse.json({ error: "Quote fetch failed." }, { status: 500 });
    }
}