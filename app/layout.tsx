import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "İzin Takip Sistemi",
  description: "İzin Takip Sistemi",
  icons: {
    icon: [
      { url: "/staff-leave-tracker-frontend/favicon.ico", type: "image/x-icon" },
      { url: "/staff-leave-tracker-frontend/assets/browserLogo.png", type: "image/png" }
    ],
    shortcut: "/staff-leave-tracker-frontend/favicon.ico",
    apple: "/staff-leave-tracker-frontend/assets/browserLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
