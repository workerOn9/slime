import type { Metadata } from "next";
import { airal } from '@/app/ui/fonts';
import "@/app/ui/globals.css";

export const metadata: Metadata = {
  title: "Slime",
  description: "A Slime For Data Transforming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${airal.className} antialiased`}>
          {children}
      </body>
    </html>
  );
}
