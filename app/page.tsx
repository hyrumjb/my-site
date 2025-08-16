export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-900 font-bold">Hyrum Bradshaw</h1>
        </div>
      </header>
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-900">I'm a BYU student and building at <a href="http://lurnloop.com" className="text-blue-500">LurnLoop</a>.</p>
          <p className="text-gray-900">Places I've lived at least 6 months: Columbus, Palo Alto, Chandler, St. George, Rochester, Bennington, Gilbert, Kaysville, Morong, Infanta, and Provo.</p>
          <h2 className="text-gray-900">
            Links:
          </h2>
          <ul className="list-disc">
            <li><a href="https://github.com/hyrumjb" className="text-blue-500">GitHub</a></li>
            <li><a href="instgram"></a></li>
            <li> x</li>
          </ul>
          <h2 className="text-gray-900">
            Projects:
          </h2>
          <ul className="list-disc">
            <li>July 2025 / <a href="https://lurnloop.com" className="text-blue-500">LurnLoop</a>, an AI-powered tutor</li>
            <li>August 2025 / <a href="https://lola.so" className="text-blue-500">Lola</a>, a stealth project (for now)</li>
          </ul>
          <h2 className="text-gray-900">
            Articles:
          </h2>
          <ul className="list-disc">
            <li><a href="https://github.com/hyrumjb/lurnloop" className="text-blue-500">LurnLoop</a></li>
            <li><a href="https://github.com/hyrumjb/lurnloop" className="text-blue-500">LurnLoop</a></li>
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
