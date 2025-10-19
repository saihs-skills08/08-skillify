import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "08 Skillify",
  description: "培訓GuideBook、練習題目、Kotlin與Java的線上IDE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-tw">
      <link rel="icon" href="/worldskills-logo.svg" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#5BC58D" height={4} showSpinner={false} />
        <NavBar />
        <div className="mt-17">{children}</div>
      </body>
    </html>
  );
}
