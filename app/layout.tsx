import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canitrack - Canicross Performance Tracking",
  description: "Track your canicross performance and compete with other teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
