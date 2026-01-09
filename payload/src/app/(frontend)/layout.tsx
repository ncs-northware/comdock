import type { ReactNode } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
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
          <Theme
            accentColor="teal"
            grayColor="gray"
            panelBackground="translucent"
            radius="medium"
            scaling="100%"
          >
            <main>{children}</main>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
