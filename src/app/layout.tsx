import type { Metadata } from "next";
import "./globals.css";

import StateProvider from "./StateProvider";
import { CssBaseline } from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FloatingAddUserButton from "@/components/FloatingAddUserButton";

export const metadata: Metadata = {
  title: "Home | NextJS Frontend",
  description: "INYOU Test Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StateProvider>
          <CssBaseline />
          <NavBar />
          {children}
          <Footer />
          <FloatingAddUserButton />
        </StateProvider>
      </body>
    </html>
  );
}
