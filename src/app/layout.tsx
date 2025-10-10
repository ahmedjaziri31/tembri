import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

// Poppins for headings and titles - Bold and Extra Bold weights
const poppinsHeading = Poppins({
  variable: "--font-poppins-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"], // Semi-bold, Bold, Extra-bold, Black for titles
  display: "swap",
  preload: true,
});

// Poppins for body text - Regular and Medium weights
const poppinsBody = Poppins({
  variable: "--font-poppins-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"], // Light, Regular, Medium for body text
  display: "swap",
});

// Poppins for secondary/subtitle text - Medium weight
const poppinsSecondary = Poppins({
  variable: "--font-poppins-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular, Medium, Semi-bold for secondary text
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
        <link rel="preload" href="/home/logo2.webp" as="image" fetchPriority="high" />
        {/* Preload project images for better performance */}
        <link rel="preload" href="/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/under armour   portrait.webp" as="image" />
        <link rel="preload" href="/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/samsung.webp" as="image" />
        <link rel="preload" href="/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/Swiss Arabian  portrait.webp" as="image" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        {/* Optimize resource loading */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="img-src 'self' data: https:; connect-src 'self' https:;" />
      </head>
      <body
        className={`${poppinsHeading.variable} ${poppinsBody.variable} ${poppinsSecondary.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
