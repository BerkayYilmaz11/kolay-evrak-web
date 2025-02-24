import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/api/providers";
import { AuthGuard } from "@/components/auth-guard";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceAI - Intelligent Invoice Analysis",
  description: "AI-powered invoice analysis and accounting assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthGuard>{children}</AuthGuard>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
