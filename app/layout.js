import { Geist, Geist_Mono } from "next/font/google";
import { MarkProvider } from "../context/MarkContext";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

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
        <MarkProvider>
          <Navbar />
          {children}
          <Footer />
        </MarkProvider>
      </body>
    </html>
  );
}
