import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import AnimatedHeader from "./components/AnimatedHeader";
import "./globals.css";


const googleFont = Newsreader({ subsets: ["latin"] });

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
        <div
          id="app-root"
          className={`min-h-screen flex flex-col lg:h-screen lg:overflow-hidden ${googleFont.className} bg-stone-100`}
        >
          <header className="px-4 sm:px-6 lg:px-8 pt-10 pb-4">
            <AnimatedHeader />
          </header>

          <main className="flex-1 lg:min-h-0 px-4 sm:px-6 lg:px-8 pt-4 lg:overflow-hidden">
            <div className="mx-auto">{children}</div>
          </main>

          <footer className="px-6 sm:px-8 lg:px-10 py-12 lg:py-4 lg:pb-5">
            <div className="mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-base">
                  &copy; {new Date().getFullYear()} Hyrum Bradshaw
                </p>
                <div className="flex gap-5">
                  <a
                    href="https://github.com/hyrumjb"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-base"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://instagram.com/hyrumjb3"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-base"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/hyrumjb3"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-base"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
