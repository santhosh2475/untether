import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Untether",
  description: "Interrupt the loop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        background: "#0d0d0c",
        minHeight: "100vh",
      }}
    >
      <body
        className={`${fraunces.variable} ${inter.variable}`}
        style={{
          background: "#0d0d0c",
          color: "#e8e6df",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          fontFamily: "var(--font-inter), -apple-system, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
