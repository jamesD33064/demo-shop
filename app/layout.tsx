import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "seseragi.tart",
  description: "甜點好吃",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "w-screen overflow-x-hidden"}>
        {/* ------------------------ banner ------------------------ */}
        {/* 手機頁面 */}
        <div className="md:hidden">
          <div className="fixed top-0 left-0 w-full z-50">
            <div className="flex w-full max-w-5xl mx-auto items-center justify-between font-mono text-sm">
              <p className="w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <Link href="/" >
                  seseragi.tart
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* ------------------------ main body ------------------------ */}
        <div className="z-0 flex flex-col w-screen min-h-screen overflow-hidden items-center justify-between px-4">
          {children}
        </div>
        {/* ------------------------ footer ------------------------ */}
        <footer className="w-full bg-gray-800 text-white py-8 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
            <div>
              <p>Address: 123 Main Street, City, Country</p>
              <p>Contact: (123) 456-7890</p>
              <p>Email: info@yourcompany.com</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}