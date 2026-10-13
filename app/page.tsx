"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type Story = {
  id: string;
  category: string;
  title: string;
  description: string;
  source: string;
  time: string;
};

const stories: Story[] = [
  {
    id: "ai-developments",
    category: "AI",
    title: "The latest developments in artificial intelligence",
    description:
      "The biggest AI announcements, products, models and research from the technology industry.",
    source: "Techy.fy",
    time: "Today",
  },
  {
    id: "cybersecurity-updates",
    category: "Cybersecurity",
    title: "Important cybersecurity updates",
    description:
      "Security incidents, vulnerabilities and major developments from the cybersecurity industry.",
    source: "Techy.fy",
    time: "Today",
  },
  {
    id: "big-tech-news",
    category: "Big Tech",
    title: "What is happening across Big Tech?",
    description:
      "The latest updates from major technology companies and platforms.",
    source: "Techy.fy",
    time: "Today",
  },
];

const categories = [
  "All",
  "AI",
  "Cybersecurity",
  "Big Tech",
  "Gadgets",
  "Startups",
  "Software",
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
    >
      <path d="M6.75 4.75A1.75 1.75 0 0 1 8.5 3h7a1.75 1.75 0 0 1 1.75 1.75V21L12 17.35 6.75 21V4.75Z" />
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("techyfy:saved-stories");
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed.filter((id): id is string => typeof id === "string"));
        }
      }
    } catch {
      // Saved stories remain usable for this visit if browser storage is unavailable.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("techyfy:saved-stories", JSON.stringify(savedIds));
    } catch {
      // Keep the in-memory list working when browser storage is unavailable.
    }
  }, [savedIds, storageReady]);

  const visibleStories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return stories.filter((story) => {
      const matchesCategory =
        activeCategory === "All" || story.category === activeCategory;
      const matchesSaved = !savedOnly || savedIds.includes(story.id);
      const searchableText =
        `${story.title} ${story.description} ${story.category} ${story.source}`.toLocaleLowerCase();
      return matchesCategory && matchesSaved && (!query || searchableText.includes(query));
    });
  }, [activeCategory, savedIds, savedOnly, search]);

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignupMessage(
      "Newsletter delivery isn’t connected yet, so your email hasn’t been submitted.",
    );
  }

  function resetFilters() {
    setSearch("");
    setActiveCategory("All");
    setSavedOnly(false);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Techy.fy home">
            <img src="/logo.jpg.png" alt="Techy.fy" />
          </a>
          <p className="tagline">What happened in tech in the last 24 hours?</p>
          <a className="header-link" href="#newsletter">Get the daily brief <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <nav className="category-nav" aria-label="Story categories">
        <div className="category-inner">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip${activeCategory === category ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setSavedOnly(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> YOUR DAILY TECH BRIEFING</div>
          <h1>What happened<br />in tech today?</h1>
          <p>One clear read on the stories shaping technology, from the people building what comes next.</p>
          <a className="hero-cta" href="#stories">Explore today’s stories <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="orbit-core">T<span>.</span>F</div>
          <span className="orbit-label label-ai">AI</span>
          <span className="orbit-label label-code">&lt;/&gt;</span>
          <span className="orbit-label label-signal">✳</span>
        </div>
        <div className="hero-index"><span>01</span> / THE DAILY EDITION</div>
      </section>

      <section className="featured-wrap" aria-labelledby="featured-heading">
        <div className="featured-card">
          <div className="featured-art" aria-hidden="true">
            <div className="featured-glow" />
            <span className="featured-orb">✳</span>
            <span className="featured-code">0101<br />1010</span>
          </div>
          <div className="featured-copy">
            <p className="section-kicker">THE EDITOR’S PICK <span>✳</span></p>
            <h2 id="featured-heading">The biggest technology stories shaping the industry today</h2>
            <p>Stay updated with important developments across AI, cybersecurity, Big Tech, startups, software and more.</p>
            <a className="text-link" href="#stories">Read today’s briefing <span aria-hidden="true">↗</span></a>
          </div>
          <span className="featured-number" aria-hidden="true">01</span>
        </div>
      </section>

      <section className="stories-section" id="stories" aria-labelledby="stories-heading">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">THE LATEST</p>
            <h2 id="stories-heading">Today in tech<span className="heading-period">.</span></h2>
          </div>
          <button
            className={`saved-filter${savedOnly ? " is-active" : ""}`}
            type="button"
            aria-pressed={savedOnly}
            onClick={() => setSavedOnly((value) => !value)}
          >
            <BookmarkIcon filled={savedOnly} />
            Saved stories <span className="saved-count">{savedIds.length}</span>
          </button>
        </div>

        <div className="story-tools">
          <label className="search-box">
            <SearchIcon />
            <span className="sr-only">Search stories</span>
            <input
              type="search"
              placeholder="Search stories, topics, companies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button className="clear-search" type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>
            )}
          </label>
          <p className="result-count">{visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}</p>
        </div>

        <div className="story-grid" aria-live="polite">
          {visibleStories.map((story, index) => {
            const isSaved = savedIds.includes(story.id);
            return (
              <article className="story-card" key={story.id}>
                <div className={`story-visual visual-${index % 3}`} aria-hidden="true">
                  <span className="visual-shape shape-one" />
                  <span className="visual-shape shape-two" />
                  <span className="visual-mark">{story.category === "AI" ? "✳" : story.category === "Cybersecurity" ? "⌑" : "◒"}</span>
                  <span className="visual-caption">TECH / 24</span>
                </div>
                <div className="story-body">
                  <div className="story-meta-top">
                    <span className="story-category">{story.category}</span>
                    <button
                      className={`bookmark-button${isSaved ? " is-saved" : ""}`}
                      type="button"
                      aria-label={isSaved ? `Remove ${story.title} from saved stories` : `Save ${story.title}`}
                      aria-pressed={isSaved}
                      onClick={() => toggleSaved(story.id)}
                    >
                      <BookmarkIcon filled={isSaved} />
                    </button>
                  </div>
                  <h3>{story.title}</h3>
                  <p className="story-description">{story.description}</p>
                  <div className="story-footer"><span>{story.source}</span><span>{story.time}</span></div>
                </div>
              </article>
            );
          })}
        </div>

        {visibleStories.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon"><SearchIcon /></span>
            <h3>{savedOnly && savedIds.length === 0 ? "Your reading list is waiting" : "No stories found"}</h3>
            <p>{savedOnly && savedIds.length === 0 ? "Save a story to keep it close. Your reading list lives right here." : "Try another search or choose a different category."}</p>
            <button className="text-link" type="button" onClick={resetFilters}>Show all stories <span aria-hidden="true">↗</span></button>
          </div>
        )}
      </section>

      <section className="newsletter" id="newsletter" aria-labelledby="newsletter-heading">
        <div className="newsletter-mark" aria-hidden="true">T<span>.</span>F</div>
        <div className="newsletter-copy">
          <p className="section-kicker">A LITTLE TECH IN YOUR INBOX</p>
          <h2 id="newsletter-heading">The signal, not the noise.</h2>
          <p>A concise daily rundown of what’s moving tech. Made for curious minds.</p>
        </div>
        <form className="signup-form" onSubmit={handleSignup}>
          <label className="sr-only" htmlFor="signup-email">Email address</label>
          <input id="signup-email" type="email" placeholder="Your email address" autoComplete="email" required />
          <button type="submit">Join the list <span aria-hidden="true">↗</span></button>
          <p className="signup-note" aria-live="polite">{signupMessage || "Newsletter delivery hasn’t been connected yet."}</p>
        </form>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">TECHY<span>.</span>FY</a>
        <p>Stay curious. Stay current.</p>
        <span>© 2026 Techy.fy</span>
      </footer>
    </main>
  );
}
