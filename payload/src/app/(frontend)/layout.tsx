import type { ReactNode } from "react";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "COMDOCK",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ThemeProvider attribute="class">
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
