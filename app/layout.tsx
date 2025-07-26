'use client'
import { ReactNode } from "react";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider>
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
