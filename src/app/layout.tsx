import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { TopNavigationBar } from "@/components/TopNavigationBar/TopNavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What to Watch",
  description:
    "An App which will let you know what to watch when you dont know what to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <TopNavigationBar />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
