import { Newsreader } from 'next/font/google';

const googleFont = Newsreader({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col ${googleFont.className} bg-stone-100`}>
      <header className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 font-bold">Hyrum Bradshaw</h1>
        </div>
      </header>
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-1">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-900 py-1">I'm a BYU student and currently building at <a href="http://lurnloop.com" className="text-blue-500">LurnLoop</a>.</p>
          <p className="text-gray-900 py-1">I've lived all over the US and the world. Here's cities I've lived in for at least 6 months: Columbus, Palo Alto, Chandler, St. George, Rochester, Bennington, Gilbert, Kaysville, Morong, Infanta, and Provo.</p>
          <h2 className="text-gray-900 py-4">
            Projects:
          </h2>
          <ul className="list-disc py-1 pl-4">
            <li>July 2025 / <a href="https://lurnloop.com" className="text-blue-500">LurnLoop</a>, an AI-powered tutor</li>
            <li>August 2025 / <a href="https://lola.so" className="text-blue-500">Lola</a>, a stealth project (for now)</li>
          </ul>
          <h2 className="text-gray-900 py-4">
            Articles:
          </h2>
          <ul className="list-disc py-1 pl-4">
            <li><a href="https://medium.com/p/c3239b59474" className="text-blue-500">Three Weird Traits Scientifically Connected With Geniuses</a> / high school article with 31,000 views</li>
            <li><a href="https://medium.com/p/5803872a7ed0" className="text-blue-500">Want to Be a Billionaire? Elon Musk Says to Study Physics</a> / high school article with 14,000 views</li>
          </ul>
          <h2 className="text-gray-900 py-4">
            Links:
          </h2>
          <ul className="list-disc py-1 pl-4">
            <li><a href="https://github.com/hyrumjb" className="text-blue-500">GitHub</a></li>
            <li><a href="https://instagram.com/hyrumjb3" className="text-blue-500">Instagram</a></li>
            <li><a href="https://x.com/hyrumjb3" className="text-blue-500">X</a></li>
          </ul>
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
