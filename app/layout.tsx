import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyrum Bradshaw",
  description: "Personal website of Hyrum Bradshaw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
