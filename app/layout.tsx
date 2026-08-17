import { LanguageProvider } from "@/lib/i18n";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "senda — See the path. See the impact.",
  description:
    "Senda helps organizations track how resources move, how they are used and what they make possible.",
  keywords: [
    "financial transparency",
    "social impact",
    "accountability",
    "nonprofit reporting",
    "funding",
  ],
  openGraph: {
    title: "senda — See the path. See the impact.",
    description:
      "Senda helps organizations track how resources move, how they are used and what they make possible.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream font-sans text-charcoal antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
