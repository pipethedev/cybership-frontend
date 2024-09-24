"use client";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../libs/global.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        value={{ light: "light" }}
      >
        <body className={inter.className}>
          <main style={{ minHeight: "100vh" }}>{children}</main>
        </body>
        <script defer src="https://cdn.brimble.io/track.js" data-website-id="0e3c9d80-2b06-4867-bbb6-715a06401d46"></script>
      </ThemeProvider>
    </html>
  );
}
