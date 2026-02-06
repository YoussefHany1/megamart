import { Geist, Geist_Mono } from "next/font/google";
import { MarkProvider } from "../context/MarkContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";
import theme from "./theme";
import Navbar from "../components/navbar/navbar";
const Footer = dynamic(() => import("../components/footer/footer"));
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MegaMart",
  description:
    "MegaMart is a leading online marketplace for buying and selling products online.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <MarkProvider>
              <Navbar />
              {children}
              <Footer />
            </MarkProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
