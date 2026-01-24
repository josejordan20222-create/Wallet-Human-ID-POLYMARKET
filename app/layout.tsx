import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'
import { cookieToInitialState } from "wagmi";
import { config } from "@/src/config/wagmi";
import Web3Provider from "@/src/context/Web3Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: "--font-merriweather"
});

export const metadata: Metadata = {
    title: "The Crystalline Ledger",
    description: "Financial Intelligence & Decentralized Finance",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get('cookie'))

    return (
        <html lang="en">
            <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
                <Web3Provider initialState={initialState}>
                    {children}
                </Web3Provider>
            </body>
        </html>
    );
}
