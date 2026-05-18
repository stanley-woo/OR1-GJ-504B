"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MarketSymbol } from "@/lib/market-data";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<MarketSymbol[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const POPULAR_STOCKS = ["AAPL", "GOOGL", "NVDA", "TSLA", "AMZN", "TSMC"]


    async function handleSearch(value: string) {
        setQuery(value);
        if (value.length === 0) {
            setResults([]);
            return;
        }
        try {
            const response = await fetch(`/api/market/search?q=${value}`);
            const data: { results: MarketSymbol[] } = await response.json();
            setResults(data.results);
        } catch {
            setResults([]);
        }
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input
                type="search"
                id="search"
                placeholder="Search for Stocks and ETF"
                className="block w-full p-3 ps-9 bg-zinc-100 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-teal-500 focus:border-green-500 shadow-sm placeholder:text-zinc-500"
                autoComplete="off"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            />
            {((isFocused && query.length === 0) || results.length > 0) && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border border-zinc-200 rounded-lg">
                    <ul className="divide-y divide-zinc-100">
                        {query.length === 0 ? (
                            <>
                                <li className="px-3 pt-3 pb-1 text-xs font-semibold text-zinc-400 uppercase">
                                    Popular Stocks
                                </li>
                                {POPULAR_STOCKS.map((ticker) => (
                                    <li key={ticker} className="flex items-center p-3 hover:bg-zinc-50 cursor-pointer" onClick={() => router.push("/stocks/" + ticker)}>
                                        <p className="font-bold">{ticker}</p>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <>
                                {results.map((stock) => (
                                    <li key={stock.symbol} className="flex items-center justify-between p-3 hover:bg-zinc-50 cursor-pointer" onClick={() => router.push("/stocks/" + stock.symbol)}>
                                        <div>
                                            <p className="font-bold">{stock.symbol}</p>
                                            <p className="text-sm text-zinc-500">{stock.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>

    );
}