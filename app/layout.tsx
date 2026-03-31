import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
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
          className={`min-h-screen flex flex-col ${googleFont.className} bg-stone-100`}
        >
          <header className="px-6 sm:px-8 lg:px-12 pt-16 pb-6">
            <div className="max-w-2xl mx-auto flex items-baseline justify-between">
              <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl mb-6">
                Hyrum Bradshaw
              </h1>
              <a
                href="https://agent.hyrumbradshaw.com"
                className="text-gray-500 hover:text-orange-600 transition-colors duration-150 text-sm"
              >
                Agent
              </a>
            </div>
          </header>

          <main className="flex-1 px-6 sm:px-8 lg:px-12 py-8 overflow-hidden">
            <div className="max-w-2xl mx-auto">{children}</div>
          </main>

          <footer className="px-6 sm:px-8 lg:px-12 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Hyrum Bradshaw
                </p>
                <div className="flex gap-5">
                  <a
                    href="https://github.com/hyrumjb"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://instagram.com/hyrumjb3"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-sm"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/hyrumjb3"
                    className="text-gray-400 hover:text-orange-600 transition-colors duration-150 text-sm"
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
