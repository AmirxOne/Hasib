import type { Metadata } from "next";
// Components
import Header from "./_components/header/Header";

// Metadata for the dashboard page
export const metadata: Metadata = {
  title: "Dashboard - Khodnevis",
  description: "Dashboard for managing Khodnevis application",
};

// Root layout component for the dashboard
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Header component */}
      <Header />
      {/* Main content */}
        {children}
    </>
  );
};