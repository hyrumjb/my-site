import { Newsreader } from 'next/font/google';

const googleFont = Newsreader({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col ${googleFont.className} bg-stone-100`}>
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 font-bold text-3xl">Hyrum Bradshaw</h1>
        </div>
      </header>
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-1">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-900 py-1">I&apos;m a BYU student and currently building a project a week (check it out on X).</p>
          <p className="text-gray-900 py-1">I&apos;ve lived all over the US and the world. Here&apos;s cities I&apos;ve lived in for at least 6 months: Columbus, Palo Alto, Chandler, St. George, Rochester, Bennington, Gilbert, Kaysville, Morong, Infanta, and Provo.</p>

          <section aria-labelledby="weekly-projects" className="my-8">
            <h2 id="weekly-projects" className="text-gray-900 text-lg font-semibold pb-2 border-b border-gray-200 mb-4">
              Weekly Projects
            </h2>

            <ul className="max-w-2xl space-y-3">
              {/* Featured / current week — subtle emphasis */}
              <li className="flex items-start gap-4 py-3 border-b border-gray-200 last:border-b-0">
                <time className="w-28 text-sm text-gray-500 tracking-wide">Sep 19, 2025</time>

                <div className="min-w-0">
                  <a
                    href="https://lola.so"
                    className="block text-lg text-blue-500 underline hover:text-blue-800"
                  >
                    Lola
                  </a>
                  <p className="mt-1 text-gray-900 leading-relaxed">
                    Long-form AI video — 30-second videos from a single prompt.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4 py-3 border-b border-gray-200 last:border-b-0">
                <time className="w-28 text-sm text-gray-500 tracking-wide">Aug 11, 2025</time>

                <div className="min-w-0">
                  <a
                    href="https://lurnloop.com"
                    className="block text-lg text-blue-500 underline hover:text-blue-800"
                  >
                    LurnLoop
                  </a>
                  <p className="mt-1 text-gray-900 leading-relaxed">
                    AI-powered tutor — succinct feedback loops for learning retention.
                  </p>
                </div>
              </li>
            </ul>
          </section>
          
          <section aria-labelledby="articles" className="my-8">
            <h2 id="articles" className="text-gray-900 text-lg font-semibold pb-2 border-b border-gray-200 mb-4">
              Articles
            </h2>
            <ul className="list-disc list-inside pl-4">
              <li><a href="https://medium.com/p/c3239b59474" className="text-blue-500 underline hover:text-blue-800">Three Weird Traits Scientifically Connected With Geniuses</a> / high school article with 31,000 views</li>
              <li><a href="https://medium.com/p/5803872a7ed0" className="text-blue-500 underline hover:text-blue-800">Want to Be a Billionaire? Elon Musk Says to Study Physics</a> / high school article with 14,000 views</li>
            </ul>
          </section>

          <section aria-labelledby="links" className="my-8">
            <h2 id="links" className="text-gray-900 text-lg font-semibold pb-2 border-b border-gray-200 mb-4">
              Links
            </h2>
            <ul className="list-disc list-inside pl-4">
              <li><a href="https://github.com/hyrumjb" className="text-blue-500 underline hover:text-blue-800">GitHub</a></li>
              <li><a href="https://instagram.com/hyrumjb3" className="text-blue-500 underline hover:text-blue-800">Instagram</a></li>
              <li><a href="https://x.com/hyrumjb3" className="text-blue-500 underline hover:text-blue-800">X</a></li>
            </ul>
          </section>
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">&copy; 2025 Hyrum Bradshaw</p>
        </div>
      </footer>
    </div>
  );
}
