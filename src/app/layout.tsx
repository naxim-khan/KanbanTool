import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// If you also want a mono font, add it here via `next/font/google`

export const metadata: Metadata = {
  title: "PM Kanban",
  description:
    "A Kanban task management app built with Next.js, TypeScript, and modern frontend architecture.",
  applicationName: "PM Kanban",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/kanban-logo.png", type: "image/png" }],
    apple: [{ url: "/kanban-logo.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
