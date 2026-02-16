import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppShot Pro - Beautiful Screenshot Mockups",
  description: "Transform your screenshots into stunning visuals with gradients, device frames, and professional templates.",
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
