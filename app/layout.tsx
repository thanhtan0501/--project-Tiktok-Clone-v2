import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Auth from "./components/Auth/Auth";
import UserProvider from "./context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tiktok",
    description: "Tiktok",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={inter.className}>
                    <main className="relative flex flex-col min-h-screen">
                        <Header />
                        <div className="flex-grow flex-1 flex flex-col h-full">
                            {children}
                        </div>
                    </main>
                    <Auth />
                </body>
            </UserProvider>
        </html>
    );
}
