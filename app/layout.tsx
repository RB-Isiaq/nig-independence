import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Cursor } from "@/components/motion/cursor.client";
import { MotionNotice } from "@/components/motion/motion-notice.client";
import { RecordController } from "@/components/motion/record-controller.client";
import { ScrollProgress } from "@/components/motion/scroll-progress.client";
import { SmoothScroll } from "@/components/motion/smooth-scroll.client";
import { IntroGateScript } from "@/components/sections/intro/intro-gate-script";
import { getSiteUrl, SITE } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE.name,
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_NG" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#03140c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: IntroGateScript adds classes to <html> before hydration.
    <html lang="en-NG" className={`${display.variable} ${sans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <IntroGateScript />
      </head>
      <body className="min-h-svh">
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <RecordController />
        <MotionNotice />
        {children}
      </body>
    </html>
  );
}
