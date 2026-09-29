const news = [
  {
    category: "AI",
    image: "/ai-news.jpg",
    title: "The latest developments in artificial intelligence",
    description:
      "The biggest AI announcements, products, models and research from the technology industry.",
    source: "Techy.fy",
    time: "Today",
  },
  {
    category: "Cybersecurity",
    title: "Important cybersecurity updates",
    description:
      "Security incidents, vulnerabilities and major developments from the cybersecurity industry.",
    source: "Techy.fy",
    time: "Today",
  },
  {
    category: "Big Tech",
    title: "What is happening across Big Tech?",
    description:
      "The latest updates from major technology companies and platforms.",
    source: "Techy.fy",
    time: "Today",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <img
  src="/logo.jpg.png"
  alt="Techy.fy"
  className="h-29 w-auto"
/>

          <p className="mt-1 text-sm text-gray-500">
            What happened in tech in the last 24 hours?
          </p>
        </div>
      </header>

      <nav className="border-b border-gray-200">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 py-4 text-sm font-medium">
          <span>All</span>
          <span>AI</span>
          <span>Cybersecurity</span>
          <span>Big Tech</span>
          <span>Gadgets</span>
          <span>Startups</span>
          <span>Software</span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-8">
  <p className="mb-3 text-sm font-semibold text-gray-500">
    FEATURED STORY
  </p>

  <h2 className="max-w-3xl text-3xl font-bold leading-tight">
    The biggest technology stories shaping the industry today
  </h2>

  <p className="mt-4 max-w-2xl text-gray-600">
    Stay updated with important developments across AI, cybersecurity,
    Big Tech, startups, software and more.
  </p>

  <button className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white">
    Read More
  </button>
</div>
        <h2 className="mb-6 text-2xl font-bold">
          Latest Tech News
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <article
            key={article.title}
            className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md"
            >
              <img
  src={article.image}
  alt={article.title}
  className="mb-5 h-48 w-full rounded-lg object-cover"
/>
    
            
              <p className="mb-3 text-sm font-semibold text-gray-500">
                {article.category}
              </p>

              <h3 className="text-xl font-bold leading-tight">
                {article.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {article.description}
              </p>

              <div className="mt-6 flex justify-between text-xs text-gray-400">
                <span>{article.source}</span>
                <span>{article.time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}