import Header from "./components/Header";
import Footer from "./components/Footer";
import UserStatusBar from "./components/UserStatusBar";
import { Providers } from "./components/Providers";
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agrupamento 1066 Ribamar",
  description: "Site oficial do Agrupamento 1066 Ribamar - CNE Portugal",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { /*Readonly<*/
  return (
    /*
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>*/
    <html lang="pt">
      <body className="bg-zinc-50 dark:bg-black text-gray-800 dark:text-gray-200 font-sans">
        <Providers>
          <UserStatusBar />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
