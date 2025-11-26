import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/NavbarComponent";
import Script from "next/script";
import "next-cloudinary/dist/cld-video-player.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://digteltechnologies.com/"), // your domain
  title: {
    default: "Digtel - Digital Solutions for Modern Businesses",
    template: "%s | Digtel"
  },
  description:
    "Digtel provides modern digital solutions including web development, mobile apps, branding, and digital marketing to help businesses scale in the digital world.",
  keywords: [
    "Digtel",
    "web development",
    "mobile app development",
    "digital marketing",
    "Home automation",
    "CCTV",
    "software company",
    "IT solutions"
  ],
  authors: [{ name: "Digtel Team" }],
  creator: "Digtel",
  publisher: "Digtel",

  openGraph: {
    title: "Digtel - Digital Solutions for Modern Businesses",
    description:
      "Grow your business with expert digital solutions including websites, apps, branding, and marketing.",
    url: "https://digteltechnologies.com/",
    siteName: "Digtel",
    images: [
      {
        url: "/og-image.png", // upload this image inside public/
        width: 1200,
        height: 630,
        alt: "Digtel - Digital Solutions"
      }
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Digtel - Digital Solutions for Modern Businesses",
    description:
      "Digital solutions for businesses: web dev, app dev, branding, and marketing.",
    images: ["/og-image.png"],
    creator: "@digtel", // optional
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://digtel.in",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
