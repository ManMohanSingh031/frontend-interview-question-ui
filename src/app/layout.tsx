import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Frontend Question - Frontend Interview Preparation",
  description: "Master frontend interviews with interactive mindmaps, question trees, and company-specific playbooks for React, JavaScript, and system design.",
  keywords: ["frontend interview", "react interview", "javascript interview", "technical interview", "interview preparation"],
  authors: [{ name: "FrontendQuestion" }],
  creator: "FrontendQuestion",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frontendquestion.com",
    title: "Frontend Question - Frontend Interview Preparation",
    description: "Master frontend interviews with interactive mindmaps, question trees, and company-specific playbooks for React, JavaScript, and system design.",
    siteName: "Frontend Question",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Question - Frontend Interview Preparation",
    description: "Master frontend interviews with interactive mindmaps, question trees, and company-specific playbooks for React, JavaScript, and system design.",
    creator: "@frontendquestion",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-inter antialiased bg-dark-950`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}