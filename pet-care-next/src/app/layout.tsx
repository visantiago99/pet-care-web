import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "@next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import ReactQueryProvider from "@/lib/react-query/ReactQueryProvider";
import { UserProvider } from "@/contexts/userContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Adopt Me - Adoção de pets",
  description: "Adopt Me - Adoção de pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ReactQueryProvider>
          <UserProvider>
            <Header />
            {children}
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
