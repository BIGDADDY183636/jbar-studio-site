import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jbar.studio"),
  title: "JBAR Design Studio — $400 Custom Websites for Small Businesses",
  description:
    "Custom-coded websites for independent businesses. Flat $400, 1-week build, up to 5 pages. Hosted on Vercel. Based in Chicago.",
  keywords: ["web designer Chicago", "small business website", "custom website $400", "affordable web design", "Chicago web design"],
  openGraph: {
    title: "JBAR Design Studio — $400 Custom Websites",
    description: "Custom-coded websites for independent businesses. Flat $400, 1-week build.",
    url: "https://jbar.studio",
    siteName: "JBAR Design Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JBAR Design Studio — $400 Custom Websites",
    description: "Custom-coded websites for independent businesses. Flat $400, 1-week build.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "JBAR Design Studio",
              "description": "Custom-coded websites for independent businesses. Flat $400, 1-week build.",
              "url": "https://jbar.studio",
              "email": "hello@jbar.studio",
              "areaServed": {
                "@type": "City",
                "name": "Chicago",
              },
              "priceRange": "$400",
              "image": "https://jbar.studio/og-image.png",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
