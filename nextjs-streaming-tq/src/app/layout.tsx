'use client'

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import NavBar from "./components/organisms/NavBar";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
   <html lang="ja">
    <body>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <div className="mt-6">
          {children}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </body>
   </html>
  );
}
