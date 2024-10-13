import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google"
import { ReactNode, Suspense } from "react";

import Loader from "@/components/loader";
import Logo from "@/components/logo";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Unofficial SCP Foundation - Entries",
  description: "List of unofficially discovered SCP anomalies on the world. Please, if you see any entry here, follow the steps described on appropirate page.",
  keywords: ["scp", "entities", "entries", "secrets", "blog"],
  openGraph: {
    title: "Unofficial SCP Foundation - Entries",
    description: "List of unofficially discovered SCP anomalies on the world. Please, if you see any entry here, follow the steps described on appropirate page.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://scp.kuba.lol"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "black"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body>
        <Suspense fallback={<Loader />}>
          <Logo />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
