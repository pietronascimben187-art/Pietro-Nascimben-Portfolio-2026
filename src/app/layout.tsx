import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Pietro Nascimben | Portfolio",
  description: "Cinematic scrollytelling curtain parallax.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased bg-white">
      <body className="flex flex-col bg-white text-black selection:bg-black selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
