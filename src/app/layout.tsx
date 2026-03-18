import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eren Keleş — AI Developer & Automation Engineer",
  description:
    "CS senior who ships production AI systems. Built a 20,000-line educational platform, published an IEEE paper, and deployed automation tools used by real organizations.",
  openGraph: {
    title: "Eren Keleş — AI Developer",
    description: "I build AI systems that ship.",
    url: "https://keles.dev",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
