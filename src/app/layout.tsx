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
  title: {
    default: "Maison Elaris | Global AI Agentic Integrated Marketing and Media Company",
    template: "%s | Maison Elaris"
  },
  description: "AI agentic integrated marketing and media company delivering creative, content, media planning, and activation with automation built for performance at scale.",
  keywords: ["Maison Elaris, AI agentic media company, integrated marketing, integrated media, creative automation, performance creative, campaign automation, , creative production, content marketing, marketing analytics"],
  authors: [{ name: "Maison Elaris" }],
  creator: "Maison Elaris",
  publisher: "Maison Elaris",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.maisonelaris.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Maison Elaris | Global Integrated Marketing Communications Agency",
    description: "A global IMC partner uniting brand strategy, creative, media, and data. AI-driven planning, retail media, and performance—network-grade outcomes with boutique speed.",
    url: 'https://www.maisonelaris.com',
    siteName: 'Maison Elaris',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maison Elaris | Global Integrated Marketing Communications Agency",
    description: "A global IMC partner uniting brand strategy, creative, media, and data. AI-driven planning, retail media, and performance—network-grade outcomes with boutique speed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
