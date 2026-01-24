import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ESTO ES VITAL para que se vea el fondo oscuro

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Polymarket Login",
    description: "Auth with World ID",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
