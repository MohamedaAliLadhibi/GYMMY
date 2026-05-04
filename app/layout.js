import "./globals.css";
import { Fraunces, Nunito } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display"
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata = {
  title: "Bloom Journey for Islem",
  description: "A playful 30-day challenge app for Islem, rebuilt as a Next.js project."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${nunito.variable}`}>{children}</body>
    </html>
  );
}
