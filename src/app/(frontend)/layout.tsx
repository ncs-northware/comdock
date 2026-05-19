import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import "./styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: {
    template: "%s | COMDOCK",
    default: "COMDOCK",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      lang="de"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Header />
          <main className="px-10 py-10 lg:px-20 xl:px-40">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
