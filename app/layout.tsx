import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  IS_PREVIEW_DEPLOY,
  buildShareMetadata,
} from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | BidaWash",
  },
  description: SITE_DESCRIPTION,
  applicationName: "BidaWash",
  keywords: [
    "BidaWash",
    "car wash",
    "automated car wash",
    "Manila",
    "Philippines",
    "carwash Manila",
  ],
  alternates: { canonical: "/" },
  ...buildShareMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  robots: IS_PREVIEW_DEPLOY
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
