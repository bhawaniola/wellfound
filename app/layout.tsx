import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
