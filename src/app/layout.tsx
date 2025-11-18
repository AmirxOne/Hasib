import type { Metadata } from "next";
import iranYekanFont from "@/src/fonts/iranYekanFont";
import Providers from "@/components/Providers";
import AuthChecker from "@/components/AuthChecker";
import "./globals.css";

export const metadata: Metadata = {
  title: "سیستم حسابداری",
  description: "سیستم مدیریت حسابداری",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning dir="rtl" lang="fa">
      <body className={`${iranYekanFont.variable} font-sans antialiased`}>
        <Providers>
          <AuthChecker />
          {children}
        </Providers>
      </body>
    </html>
  );
}