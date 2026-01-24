"use client";

import { useState } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { Copy, ArrowDown, ArrowUp, RefreshCw, ExternalLink, MoreVertical, LogOut } from "lucide-react";

// Polygon USDC.e Address
const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

export default function MetaMaskWalletView() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    // Real Native Balance (POL/MATIC)
    const { data: nativeBalance } = useBalance({ address });

    // Real USDC Balance
    const { formatted: usdcBalance } = useTokenBalance(USDC_ADDRESS);

    const [activeTab, setActiveTab] = useState<"assets" | "activity">("assets");

    // Approximate USD Value (Mock Price Feeds for now, functionality focus)
    const maticPrice = 0.72;
    const totalUsd = (
        (parseFloat(nativeBalance?.formatted || "0") * maticPrice) +
        parseFloat(usdcBalance || "0")
    ).toFixed(2);

    return (
        <div className="min-h-screen bg-[#121212] text-white font-sans flex justify-center">
            {/* Container: Works as Full Screen Mobile, Centered Card on Desktop */}
            <div className="w-full max-w-md bg-[#121212] md:bg-[#1c1c1c] md:my-8 md:rounded-[32px] md:shadow-2xl md:border border-white/5 flex flex-col min-h-[800px]">

                {/* Header */}
                <header className="px-6 py-4 flex items-center justify-between bg-[#121212] md:bg-transparent sticky top-0 z-10">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                            <span className="text-xs font-medium text-gray-400">Polygon Mainnet</span>
                        </div>
                    </div>
                    <button
                        onClick={() => disconnect()}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-gray-400" />
                    </button>
                </header>

                {/* Hero: Account & Balance */}
                <div className="flex flex-col items-center pt-6 pb-8 space-y-6">
                    {/* Account Icon */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-4 border-[#121212] md:border-[#1c1c1c] shadow-xl"></div>

                    {/* Address */}
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-sm font-mono text-gray-300">
                            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x..."}
                        </span>
                        <Copy className="w-3 h-3 text-gray-500" />
                    </div>

                    {/* Total Balance */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">${totalUsd} USD</h1>
                        <p className="text-sm text-gray-500 mt-1">Total Portfolio Value</p>
                    </div>

                    {/* Action Buttons (The MetaMask Row) */}
                    <div className="flex space-x-6">
                        <ActionButton icon={<ArrowDown />} label="Receive" />
                        <ActionButton icon={<ArrowUp />} label="Send" />
                        <ActionButton icon={<RefreshCw />} label="Swap" />
                        <ActionButton icon={<ExternalLink />} label="Bridge" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab("assets")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "assets" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
                    >
                        Assets
                    </button>
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "activity" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}
                    >
                        Activity
                    </button>
                </div>

                {/* Content List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {activeTab === "assets" ? (
                        <>
                            <AssetItem
                                symbol="POL"
                                balance={nativeBalance?.formatted.slice(0, 6) || "0.00"}
                                value={(parseFloat(nativeBalance?.formatted || "0") * maticPrice).toFixed(2)}
                                icon="🟣"
                            />
                            <AssetItem
                                symbol="USDC.e"
                                balance={usdcBalance || "0.00"}
                                value={usdcBalance || "0.00"}
                                icon="💲"
                            />
                        </>
                    ) : (
                        <div className="text-center py-10 text-gray-500 text-sm">
                            <p>No recent activity</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex flex-col items-center space-y-2 group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:bg-blue-500 transition-transform active:scale-95 shadow-lg shadow-blue-900/20">
                {/* Scale icon down slightly */}
                <div className="scale-75">{icon}</div>
            </div>
            <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300">{label}</span>
        </button>
    );
}

function AssetItem({ symbol, balance, value, icon }: { symbol: string, balance: string, value: string, icon: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl border border-white/5 group-hover:border-white/20">
                    {icon}
                </div>
                <div>
                    <p className="font-bold text-gray-200">{symbol}</p>
                    <p className="text-xs text-gray-500">$0.00 USD</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-200">{balance}</p>
                <p className="text-xs text-gray-500">${value} USD</p>
            </div>
        </div>
    );
}
