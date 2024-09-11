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
      </ThemeProvider>
    </html>
  );
}
