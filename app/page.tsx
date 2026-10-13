"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type Story = {
  id: string;
  category: string;
  categories: string[];
  title: string;
  description: string;
  source: string;
  url: string;
  time: string;
};

const stories: Story[] = [
  {
    id: "ray-ban-stories-launch",
    category: "Gadgets",
    categories: ["Gadgets", "Meta Glasses"],
    title: "2021: Ray-Ban Stories puts cameras and audio in classic frames",
    description: "Meta and EssilorLuxottica's first consumer glasses paired two 5-megapixel cameras, up-to-30-second video, open-ear speakers, calls and a capture light. They launched without an AI assistant; the starting US price was $299.",
    source: "Meta · Sep 2021",
    url: "https://about.fb.com/news/2021/09/introducing-ray-ban-stories-smart-glasses/",
    time: "Sep 9, 2021",
  },
  {
    id: "ray-ban-meta-launch",
    category: "Big Tech",
    categories: ["Big Tech", "Gadgets", "Meta Glasses"],
    title: "2023: Ray-Ban Meta adds a better camera, livestreaming and Meta AI",
    description: "The next generation arrived with a 12-megapixel ultra-wide camera, improved audio, livestreaming to Facebook and Instagram, and a voice-first Meta AI assistant. This is the point where the product moved from connected camera glasses toward AI glasses.",
    source: "Meta · Sep 2023",
    url: "https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/",
    time: "Sep 27, 2023",
  },
  {
    id: "vision-calls-2024",
    category: "AI",
    categories: ["AI", "Software", "Meta Glasses"],
    title: "2024: Meta AI learns to answer questions about what you see",
    description: "A US and Canada beta let wearers ask about objects and text in view, including translation help. WhatsApp and Messenger video calls also gained a way to share the glasses' point of view. Availability and supported languages rolled out gradually by country.",
    source: "Meta · Apr 2024",
    url: "https://about.fb.com/news/2024/04/new-ray-ban-meta-smart-glasses-styles-and-meta-ai-updates/",
    time: "Apr 23, 2024",
  },
  {
    id: "ai-global-rollout",
    category: "Software",
    categories: ["Software", "AI", "Meta Glasses"],
    title: "2024–25: AI, translation and visual help expand market by market",
    description: "Meta expanded voice AI and live translation to more countries and languages. In 2025, the EU rollout grew in stages; visual questions about what the wearer sees remained limited to supported markets. Features were not identical everywhere.",
    source: "Meta · Apr 2025 update",
    url: "https://about.fb.com/news/2025/04/meta-ai-begins-roll-out-on-ray-ban-meta-glasses-to-even-more-countries-in-the-eu/",
    time: "2024–2025",
  },
  {
    id: "ray-ban-gen2",
    category: "Gadgets",
    categories: ["Gadgets", "AI", "Meta Glasses"],
    title: "2025: Ray-Ban Meta Gen 2 brings 3K video and longer battery life",
    description: "Gen 2 kept the familiar display-free design and added up to twice the battery life versus the previous generation, 3K Ultra HD video, new frame and lens choices, and further AI features. Meta announced a US starting price of $379; price and availability vary by market.",
    source: "Meta · Sep 2025",
    url: "https://about.fb.com/news/2025/09/ray-ban-meta-gen-2-better-battery-life-video-capture/",
    time: "Sep 17, 2025",
  },
  {
    id: "display-neural-band",
    category: "Gadgets",
    categories: ["Gadgets", "AI", "Meta Glasses"],
    title: "2025: Meta Ray-Ban Display adds an in-lens screen and Neural Band",
    description: "Unlike the camera-and-audio Ray-Ban Meta, Display adds a full-colour, high-resolution in-lens display for glanceable messages and visuals. Its included wrist-worn Neural Band reads subtle muscle signals for gesture input. In 2026, Meta announced navigation, a call hologram, Explore apps and wider market availability.",
    source: "Meta · Sep 2025 / Sep 2026",
    url: "https://about.fb.com/news/2025/09/meta-ray-ban-display-ai-glasses-emg-wristband/",
    time: "Sep 17, 2025 · updated Sep 2026",
  },
  {
    id: "oakley-performance",
    category: "Gadgets",
    categories: ["Gadgets", "AI", "Meta Glasses"],
    title: "2025: Oakley Meta HSTN and Vanguard target sport and training",
    description: "The Oakley line adapts the camera, open-ear audio and Meta AI to sport. HSTN introduced 3K video and athlete-oriented use; Vanguard added a wraparound frame, IP67 dust and water resistance, Garmin and Strava integrations, real-time workout stats, and high-action capture modes.",
    source: "Meta · Jun / Sep 2025",
    url: "https://about.fb.com/news/2025/09/oakley-meta-vanguard-performance-ai-glasses-sports/",
    time: "Jun–Sep 2025",
  },
  {
    id: "software-ecosystem",
    category: "Software",
    categories: ["Software", "Meta Glasses"],
    title: "The glasses gain an app and service ecosystem",
    description: "Software updates added WhatsApp and Messenger calls, live translation, Spotify music discovery and Conversation Focus for busy places. The companion Meta AI app manages the devices; supported integrations and Early Access features depend on region and model.",
    source: "Meta · Dec 2025 update",
    url: "https://about.fb.com/news/2025/12/updates-to-meta-ai-glasses-conversation-focus-spotify-integration/",
    time: "2024–2026",
  },
  {
    id: "developer-startups",
    category: "Startups",
    categories: ["Startups", "Software", "Meta Glasses"],
    title: "Developers and small teams begin building hands-free tools",
    description: "Meta opened a Device Access Toolkit and announced AI Glasses Impact Grants for organizations and developers. Its examples include crop-health work with agriculture software company Agerpoint, accessibility projects and hands-free production workflows.",
    source: "Meta · Jan 2026",
    url: "https://about.fb.com/news/2026/01/ai-glasses-impact-grants-wearable-technology-for-good/",
    time: "Jan 2026",
  },
  {
    id: "privacy-consent",
    category: "Cybersecurity",
    categories: ["Cybersecurity", "Big Tech", "Meta Glasses"],
    title: "Privacy: a recording light helps signal capture, but consent still matters",
    description: "Meta says a blinking white capture LED signals photos and video, and Gen 2 onward disables the camera if the indicator is blocked or tampered with. The light is a device safeguard, not bystander consent; privacy groups, venues and regulators continue to debate recording in shared spaces.",
    source: "AP News · Oct 2026",
    url: "https://apnews.com/article/be20dbd949ce058023864b66219f9c2b",
    time: "Ongoing",
  },
  {
    id: "muse-spark-meta-glasses-2026",
    category: "AI",
    categories: ["AI", "Software", "Meta Glasses"],
    title: "2026: Muse Spark arrives on glasses, with more hands-free AI plans",
    description: "Meta began rolling its Muse Spark model to Ray-Ban Meta and Oakley Meta in the US and Canada, with Display to follow. At Connect, it described Muse as a personal agent for reminders, plans and tasks, extending the glasses beyond quick questions about the view.",
    source: "Meta · Apr / Sep 2026",
    url: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
    time: "Apr–Sep 2026",
  },
  {
    id: "meta-glasses-2026-lineup",
    category: "Big Tech",
    categories: ["Big Tech", "Gadgets", "Meta Glasses"],
    title: "2026: Gen 3, audio-only frames and a new Meta Glasses collection",
    description: "Meta's September 2026 Connect expanded the range: Ray-Ban Meta Gen 3 adds a slimmer fit, up to nine hours of battery, 12MP camera, 3K video and a customizable action button; Ray-Ban Meta Audio focuses on open-ear listening and calls; and the separate Meta Glasses collection adds prescription-capable styles with Muse Spark AI. Announced prices and ship dates vary by product.",
    source: "Meta · Sep 2026",
    url: "https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/",
    time: "Sep 23, 2026",
  },
  {
    id: "display-update-2026",
    category: "Software",
    categories: ["Software", "Gadgets", "Meta Glasses"],
    title: "Meta Ray-Ban Display gains navigation, hologram calls and apps",
    description: "The 2026 update adds cycling and transit directions on the lens display, walking directions that refer to visible landmarks, a voice-driven personal hologram for WhatsApp calls, and an Explore app. Meta announced expansion to the UK, Canada, France, Italy and Germany; rollouts and feature availability are staged.",
    source: "Meta · Sep 2026",
    url: "https://about.fb.com/news/2026/09/new-features-for-meta-ray-ban-display-navigation-hologram/",
    time: "Sep 23, 2026",
  },
];

const categories = [
  "All",
  "Meta Glasses",
  "AI",
  "Cybersecurity",
  "Big Tech",
  "Gadgets",
  "Startups",
  "Software",
];

const timeline = [
  {
    date: "SEP 2021",
    title: "Ray-Ban Stories",
    text: "First-generation camera and audio glasses. Capture, calls and music; no Meta AI assistant yet.",
    source: "Launch details",
    url: "https://about.fb.com/news/2021/09/introducing-ray-ban-stories-smart-glasses/",
  },
  {
    date: "SEP 2023",
    title: "Ray-Ban Meta",
    text: "A new generation adds the Meta name, improved camera and audio, livestreaming, and voice access to Meta AI.",
    source: "Launch details",
    url: "https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/",
  },
  {
    date: "2024",
    title: "AI sees what you see",
    text: "Visual questions, translation and hands-free video calls begin rolling out to supported users and markets.",
    source: "Feature update",
    url: "https://about.fb.com/news/2024/04/new-ray-ban-meta-smart-glasses-styles-and-meta-ai-updates/",
  },
  {
    date: "SEP 2025",
    title: "Gen 2, Display and Oakley",
    text: "Gen 2 improves capture and battery; Display introduces a screen and EMG wristband; Oakley extends the idea into sport.",
    source: "Connect launches",
    url: "https://about.fb.com/news/2025/09/meta-ray-ban-display-ai-glasses-emg-wristband/",
  },
  {
    date: "2026",
    title: "Muse Spark and new product families",
    text: "Muse Spark, Meta Glasses, Ray-Ban Meta Gen 3, Ray-Ban Meta Audio, and new Display features broaden the portfolio.",
    source: "Latest announcements",
    url: "https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",
  },
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
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
      const matchesCategory = activeCategory === "All" || story.categories.includes(activeCategory);
      const matchesSaved = !savedOnly || savedIds.includes(story.id);
      const searchableText = `${story.title} ${story.description} ${story.categories.join(" ")} ${story.source}`.toLocaleLowerCase();
      return matchesCategory && matchesSaved && (!query || searchableText.includes(query));
    });
  }, [activeCategory, savedIds, savedOnly, search]);

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }

  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignupMessage("Newsletter delivery isn’t connected yet, so your email hasn’t been submitted.");
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
          <a className="brand" href="#top" aria-label="Techy.fy home"><img src="/logo.jpg.png" alt="Techy.fy" /></a>
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
              onClick={() => { setActiveCategory(category); setSavedOnly(false); }}
            >{category}</button>
          ))}
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> THE META GLASSES STORY · UPDATED OCT 13, 2026</div>
          <h1>From camera glasses to an AI platform.</h1>
          <p>Every major Meta glasses launch, feature shift and debate from the first Ray-Ban Stories in 2021 to today.</p>
          <a className="hero-cta" href="#timeline">Explore the timeline <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="orbit-core">T<span>.</span>F</div>
          <span className="orbit-label label-ai">AI</span><span className="orbit-label label-code">&lt;/&gt;</span><span className="orbit-label label-signal">✳</span>
        </div>
        <div className="hero-index"><span>01</span> / THE DAILY EDITION</div>
      </section>

      <section className="featured-wrap" aria-labelledby="featured-heading">
        <div className="featured-card">
          <div className="featured-art" aria-hidden="true"><div className="featured-glow" /><span className="featured-orb">✳</span><span className="featured-code">2021<br />→ 2026</span></div>
          <div className="featured-copy">
            <p className="section-kicker">THE BIG PICTURE <span>✳</span></p>
            <h2 id="featured-heading">One partnership. Three product paths. An AI layer that keeps changing.</h2>
            <p>Ray-Ban Meta stays display-free, Meta Ray-Ban Display puts information on the lens, and Oakley Meta is built around performance. Muse Spark and regular software updates connect the portfolio.</p>
            <a className="text-link" href="#stories">Browse every section <span aria-hidden="true">↗</span></a>
          </div>
          <span className="featured-number" aria-hidden="true">01</span>
        </div>
      </section>

      <section className="timeline-section" id="timeline" aria-labelledby="timeline-heading">
        <div className="timeline-heading">
          <p className="section-kicker">THE PRODUCT JOURNEY</p>
          <h2 id="timeline-heading">Five years of Meta glasses<span className="heading-period">.</span></h2>
          <p>Launch milestones through October 13, 2026. Dates and feature availability vary by country and product.</p>
        </div>
        <ol className="timeline-list">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.date + item.title}>
              <span className="timeline-date">{item.date}</span>
              <div className="timeline-copy"><h3>{item.title}</h3><p>{item.text}</p><a href={item.url} target="_blank" rel="noreferrer">{item.source} <span aria-hidden="true">↗</span></a></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stories-section" id="stories" aria-labelledby="stories-heading">
        <div className="section-heading-row">
          <div><p className="section-kicker">THE COMPLETE BRIEF · 12 STORIES</p><h2 id="stories-heading">Every section<span className="heading-period">.</span></h2></div>
          <button className={`saved-filter${savedOnly ? " is-active" : ""}`} type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly((value) => !value)}>
            <BookmarkIcon filled={savedOnly} /> Saved stories <span className="saved-count">{savedIds.length}</span>
          </button>
        </div>

        <div className="story-tools">
          <label className="search-box"><SearchIcon /><span className="sr-only">Search stories</span>
            <input type="search" placeholder="Search generations, features, companies..." value={search} onChange={(event) => setSearch(event.target.value)} />
            {search && <button className="clear-search" type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
          </label>
          <p className="result-count">{visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}</p>
        </div>

        <div className="story-grid" aria-live="polite">
          {visibleStories.map((story, index) => {
            const isSaved = savedIds.includes(story.id);
            return (
              <article className="story-card" key={story.id}>
                <div className={`story-visual visual-${index % 3}`} aria-hidden="true">
                  <span className="visual-shape shape-one" /><span className="visual-shape shape-two" />
                  <span className="visual-mark">{story.category === "AI" ? "✳" : story.category === "Cybersecurity" ? "⌑" : story.category === "Startups" ? "↗" : "◒"}</span>
                  <span className="visual-caption">TECH / META</span>
                </div>
                <div className="story-body">
                  <div className="story-meta-top"><span className="story-category">{story.category}</span>
                    <button className={`bookmark-button${isSaved ? " is-saved" : ""}`} type="button" aria-label={isSaved ? `Remove ${story.title} from saved stories` : `Save ${story.title}`} aria-pressed={isSaved} onClick={() => toggleSaved(story.id)}><BookmarkIcon filled={isSaved} /></button>
                  </div>
                  <div className="story-tags">{story.categories.filter((tag) => tag !== story.category).slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <h3>{story.title}</h3>
                  <p className="story-description">{story.description}</p>
                  <div className="story-footer"><a href={story.url} target="_blank" rel="noreferrer">{story.source} ↗</a><span>{story.time}</span></div>
                </div>
              </article>
            );
          })}
        </div>

        {visibleStories.length === 0 && (
          <div className="empty-state"><span className="empty-icon"><SearchIcon /></span>
            <h3>{savedOnly && savedIds.length === 0 ? "Your reading list is waiting" : "No stories found"}</h3>
            <p>{savedOnly && savedIds.length === 0 ? "Save a story to keep it close. Your reading list lives right here." : "Try another search or choose a different category."}</p>
            <button className="text-link" type="button" onClick={resetFilters}>Show all stories <span aria-hidden="true">↗</span></button>
          </div>
        )}
        <p className="editorial-note">Coverage checked Oct 13, 2026. Product features, prices, supported languages and launch dates are based on linked announcements and can vary by market. Privacy notes include independent reporting as well as Meta’s stated safeguards.</p>
      </section>

      <section className="newsletter" id="newsletter" aria-labelledby="newsletter-heading">
        <div className="newsletter-mark" aria-hidden="true">T<span>.</span>F</div>
        <div className="newsletter-copy"><p className="section-kicker">A LITTLE TECH IN YOUR INBOX</p><h2 id="newsletter-heading">The signal, not the noise.</h2><p>A concise daily rundown of what’s moving tech. Made for curious minds.</p></div>
        <form className="signup-form" onSubmit={handleSignup}>
          <label className="sr-only" htmlFor="signup-email">Email address</label><input id="signup-email" type="email" placeholder="Your email address" autoComplete="email" required />
          <button type="submit">Join the list <span aria-hidden="true">↗</span></button>
          <p className="signup-note" aria-live="polite">{signupMessage || "Newsletter delivery hasn’t been connected yet."}</p>
        </form>
      </section>

      <footer className="site-footer"><a className="footer-brand" href="#top">TECHY<span>.</span>FY</a><p>Stay curious. Stay current.</p><span>© 2026 Techy.fy</span></footer>
    </main>
  );
}
