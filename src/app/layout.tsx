import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter, Source_Sans_3 } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"], // Only load weights actually used
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Only load common weights
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-pro",
  subsets: ["latin"],
  weight: ["300", "400", "600"], // Only load used weights
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Elaris",
  description: "Maison Elaris - Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/home/logo2.png" as="image" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        {/* Optimize resource loading */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="img-src 'self' data: https:; connect-src 'self' https:;" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${inter.variable} ${sourceSans3.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
