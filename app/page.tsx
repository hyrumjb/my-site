import { Newsreader } from 'next/font/google';

const googleFont = Newsreader({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col ${googleFont.className} bg-stone-100`}>
      <header className="px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl">Hyrum Bradshaw</h1>
        </div>
      </header>
      
      <main className="flex-1 px-6 sm:px-8 lg:px-12 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-20">
            <p className="text-gray-900 text-base leading-relaxed mb-6">I&apos;m a BYU student and currently building a project a week (check it out on X).</p>
            <p className="text-gray-900 text-base leading-relaxed">I&apos;ve lived all over the US and the world. Here&apos;s cities I&apos;ve lived in for at least 6 months: Columbus, Palo Alto, Chandler, St. George, Rochester, Bennington, Gilbert, Kaysville, Morong, Infanta, and Provo.</p>
          </div>

          <section aria-labelledby="weekly-projects" className="my-20">
            <h2 id="weekly-projects" className="text-gray-900 text-2xl font-semibold pb-4 border-b border-gray-200 mb-8">
              Weekly Projects
            </h2>

            <ul className="max-w-2xl space-y-6">
              {/* Featured / current week — subtle emphasis */}
              <li className="border-b border-gray-200 last:border-b-0">
                <a href="https://lola.so" className="block border border-transparent hover:border-orange-300 hover:rounded-lg transition-all duration-150">
                  <div className="flex items-start gap-6 py-6">
                    <time className="w-28 text-sm text-gray-500 tracking-wide pl-3">Sep 19, 2025</time>

                    <div className="min-w-0">
                      <h3 className="text-xl text-orange-600 underline hover:text-orange-700">
                        Lola
                      </h3>
                      <p className="mt-1 text-gray-900 leading-relaxed">
                        Long-form AI video — 30-second videos from a single prompt.
                      </p>
                    </div>
                  </div>
                </a>
              </li>

              <li className="border-b border-gray-200 last:border-b-0">
                <a href="https://lurnloop.com" className="block border border-transparent hover:border-orange-300 hover:rounded-lg transition-all duration-150">
                  <div className="flex items-start gap-6 py-6">
                    <time className="w-28 text-sm text-gray-500 tracking-wide pl-3">Aug 11, 2025</time>

                    <div className="min-w-0">
                      <h3 className="text-xl text-orange-600 underline hover:text-orange-700">
                        LurnLoop
                      </h3>
                      <p className="mt-1 text-gray-900 leading-relaxed">
                        AI-powered tutor — succinct feedback loops for learning retention.
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </section>
          
          <section aria-labelledby="articles" className="my-20">
            <h2 id="articles" className="text-gray-900 text-2xl font-semibold pb-4 border-b border-gray-200 mb-8">
              Articles
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-4">
              <li><a href="https://medium.com/p/c3239b59474" className="text-orange-600 underline hover:text-orange-700">Three Weird Traits Scientifically Connected With Geniuses</a> / high school article with 31,000 views</li>
              <li><a href="https://medium.com/p/5803872a7ed0" className="text-orange-600 underline hover:text-orange-700">Want to Be a Billionaire? Elon Musk Says to Study Physics</a> / high school article with 14,000 views</li>
            </ul>
          </section>

          <section aria-labelledby="links" className="my-20">
            <h2 id="links" className="text-gray-900 text-2xl font-semibold pb-4 border-b border-gray-200 mb-8">
              Links
            </h2>
            <ul className="list-disc list-inside pl-4 space-y-4">
              <li><a href="https://github.com/hyrumjb" className="text-orange-600 underline hover:text-orange-700">GitHub</a></li>
              <li><a href="https://instagram.com/hyrumjb3" className="text-orange-600 underline hover:text-orange-700">Instagram</a></li>
              <li><a href="https://x.com/hyrumjb3" className="text-orange-600 underline hover:text-orange-700">X</a></li>
            </ul>
          </section>
        </div>
      </main>
      
      <footer className="px-6 sm:px-8 lg:px-12 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">&copy; 2025 Hyrum Bradshaw</p>
        </div>
      </footer>
    </div>
  );
}
