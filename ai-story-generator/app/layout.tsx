"use client";
import "./globals.css";
import UIProvider from "./UIProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>AI Story Creator</title>
        <meta name="description" content="Create magical stories with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <UIProvider>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </UIProvider>
      </body>
    </html>
  );
}
