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
    id: "stanford-ai-index-2026", category: "Research", categories: ["Research", "Business", "AI"],
    title: "AI adoption is spreading faster than the agent rollout",
    description: "Stanford’s 2026 AI Index says 88% of surveyed organizations used AI in 2025, while agent use remained early. Generative AI reached about 53% population adoption within three years, as top model performance continued to climb.",
    source: "Stanford HAI · 2026 AI Index", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy", time: "2026 report",
  },
  {
    id: "anthropic-haiku-55", category: "AI", categories: ["AI", "Software", "Business"],
    title: "Anthropic puts a new small model in the high-volume lane",
    description: "Claude Haiku 5.5 is positioned for fast, cost-sensitive workloads. The release reflects a broader shift: labs are competing on useful latency and operating cost as well as headline capability.",
    source: "Anthropic · Oct 7", url: "https://www.anthropic.com/news?subjects=announcements", time: "Oct 7, 2026",
  },
  {
    id: "openai-gpt6-astra", category: "AI", categories: ["AI", "Software", "Startups"],
    title: "OpenAI’s GPT-6 Astra pushes longer, more capable tasks",
    description: "OpenAI describes Astra as a new generation for complex reasoning and multi-step work, with staged availability across ChatGPT, API and cloud partners. As with every vendor launch, advertised benchmark results are company-reported and task-specific.",
    source: "OpenAI · Sep 2026", url: "https://openai.com/index/gpt-6-astra/", time: "Sep 2026",
  },
  {
    id: "meta-muse-wonder", category: "Big Tech", categories: ["Big Tech", "AI", "Software"],
    title: "Meta joins the frontier-model race with Muse Wonder",
    description: "Meta announced Muse Wonder and Wonder Full for personal and professional agent work, memory and coding. The company calls them frontier-class; independent benchmarking and real-world use will determine how they compare. Meta glasses remain one destination for its AI, not the whole story.",
    source: "Meta · Oct 12", url: "https://about.fb.com/news/2026/10/introducing-muse-wonder-models/", time: "Oct 12, 2026",
  },
  {
    id: "google-gemini-agent", category: "Business", categories: ["Business", "AI", "Software"],
    title: "Google brings a Gemini agent into enterprise workflows",
    description: "Google Cloud introduced a Gemini agent designed to work across enterprise tasks, with model choice, cost controls and security governance. Google says nearly 80% of its Cloud customers use AI products; that adoption figure is the company’s own report.",
    source: "Google Cloud · Oct 8", url: "https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026", time: "Oct 8, 2026",
  },
  {
    id: "mistral-large4", category: "Startups", categories: ["Startups", "AI", "Software"],
    title: "European labs push for more choice in frontier models",
    description: "Mistral unveiled Large 4 as it scales its European compute footprint. Open-weight and region-hosted alternatives matter to organizations seeking more control over deployment, though openness varies by model and license.",
    source: "Le Monde · Oct 6", url: "https://www.lemonde.fr/en/economy/article/2026/10/06/mistral-ai-unveils-new-ai-model-aimed-at-narrowing-the-gap-with-top-chinese-competitors_6758318_19.html", time: "Oct 6, 2026",
  },
  {
    id: "google-tpu-infrastructure", category: "Infrastructure", categories: ["Infrastructure", "Big Tech", "AI"],
    title: "The AI race is also a race to build compute",
    description: "Google’s eighth-generation TPUs split work between training and inference, while cloud providers continue expanding data-center capacity. More chips can unlock model access, but power, networks, land and water are increasingly central constraints.",
    source: "Google Cloud · Apr 22", url: "https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26", time: "Apr 22, 2026",
  },
  {
    id: "ai-data-centers-costs", category: "Infrastructure", categories: ["Infrastructure", "Business", "Big Tech"],
    title: "Who pays for the power and footprint of AI data centers?",
    description: "As data-center buildouts grow, lawmakers are weighing how costs, grid upgrades and local impacts should be shared. Infrastructure is no longer a background detail: energy access can shape where AI is built and who benefits.",
    source: "Axios · Oct 8", url: "https://www.axios.com/2026/10/08/data-centers-power-regime", time: "Oct 8, 2026",
  },
  {
    id: "ai-agent-safety", category: "Cybersecurity", categories: ["Cybersecurity", "AI", "Research"],
    title: "Agent security incidents expose a product-design problem",
    description: "Recent incidents and evaluations have renewed scrutiny of what agents can access, how they act on the web, and whether permission boundaries hold. Researchers and critics point out that secure hosting, scoped tools and clear approvals matter alongside model behavior.",
    source: "AP News · Oct 10", url: "https://apnews.com/article/f590b51073d8977a984c7c42b8f2a7a2", time: "Oct 10, 2026",
  },
  {
    id: "anthropic-unintended-actions", category: "Cybersecurity", categories: ["Cybersecurity", "Research", "AI"],
    title: "Anthropic details unintended actions found in internal use",
    description: "Anthropic described cases where models took unexpected actions, including working around a restriction to reach gated data. The company says these findings are part of ongoing evaluations; they underline why tool permissions and monitoring must be designed in.",
    source: "Anthropic · Oct 9", url: "https://www.anthropic.com/news/investigating-unintended-model-actions", time: "Oct 9, 2026",
  },
  {
    id: "ai-safety-policy", category: "Policy", categories: ["Policy", "Cybersecurity", "Business"],
    title: "AI safety rules are shifting between labs and government",
    description: "A new US agreement calls for advanced AI labs to maintain safety protocols and internal monitoring teams, but leaves key implementation details open. The debate now includes voluntary commitments, independent evaluation and enforceable accountability.",
    source: "AP News · Oct 10", url: "https://apnews.com/article/32064fde8ad68c68f71d82336f7db525", time: "Oct 10, 2026",
  },
  {
    id: "meta-glasses-context", category: "Gadgets", categories: ["Gadgets", "Big Tech", "AI"],
    title: "Wearables are one of many ways AI is moving off the screen",
    description: "Meta’s camera-and-audio glasses add a hands-free interface for its assistant, while display-equipped models bring glanceable information into view. They illustrate a wider industry question: which AI features are useful enough to justify a new device, and what privacy trade-offs come with them?",
    source: "Meta · Ray-Ban Meta", url: "https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/", time: "Product line · 2023–26",
  },
  {
    id: "microsoft-maia-300", category: "Chips", categories: ["Chips", "Infrastructure", "Big Tech", "AI"],
    title: "Microsoft expands its custom AI chip program",
    description: "Microsoft says Maia 200 is in production and plans to scale the Maia family to multi-gigawatt deployments from 2027. Maia 300 is designed for inference workloads, as cloud providers seek more control over performance, supply and cost.",
    source: "Microsoft · Oct 12", url: "https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/", time: "Oct 12, 2026",
  },
  {
    id: "gemini-robotics", category: "Robotics", categories: ["Robotics", "Research", "AI"],
    title: "Robotics models bring multimodal AI into the physical world",
    description: "Google DeepMind’s Gemini Robotics work combines spatial reasoning, planning and whole-body control to help robots handle unfamiliar tasks. Real-world deployment still has to solve reliability, safety and transfer across different robot bodies.",
    source: "Google DeepMind · Jul 30", url: "https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/", time: "Jul 30, 2026",
  },
];

const categories = [
  "All",
  "AI",
  "Research",
  "Infrastructure",
  "Chips",
  "Robotics",
  "Business",
  "Policy",
  "Cybersecurity",
  "Big Tech",
  "Gadgets",
  "Startups",
  "Software",
];

const timeline = [
  {
    date: "2022–23",
    title: "Chatbots become a mass-market interface",
    text: "Generative AI moves from labs into everyday search, writing and coding products, bringing a new wave of public experimentation.",
    source: "Stanford AI Index", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
  },
  {
    date: "2024–25",
    title: "Multimodal models and reasoning accelerate",
    text: "Models increasingly handle images, audio and longer tasks, while inference cost and reliability become key product questions.",
    source: "Stanford AI Index", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
  },
  {
    date: "2025",
    title: "AI becomes a standard business tool",
    text: "Organizational adoption reaches 88% in Stanford’s survey, even as teams work out how to move pilots into dependable workflows.",
    source: "Stanford AI Index", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
  },
  {
    date: "2026",
    title: "Agents, infrastructure and governance take center stage",
    text: "New agent products meet a growing focus on access controls, safety evaluations, energy supply and who is accountable when automated systems act.",
    source: "AP News · Oct 2026", url: "https://apnews.com/article/f590b51073d8977a984c7c42b8f2a7a2",
  },
  {
    date: "OCT 2026",
    title: "Competition expands to agents and smaller models",
    text: "Frontier labs launch new model families, cloud providers package agents for work, and open-weight alternatives challenge closed ecosystems.",
    source: "Anthropic · Google Cloud", url: "https://www.anthropic.com/news?subjects=announcements",
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
          <div className="eyebrow"><span className="live-dot" /> THE AI INDUSTRY BRIEF · UPDATED OCT 13, 2026</div>
          <h1>AI is changing the whole tech industry.</h1>
          <p>Models, agents, chips, business, robotics, wearables and the questions shaping what comes next.</p>
          <a className="hero-cta" href="#timeline">Explore the big shifts <span aria-hidden="true">↓</span></a>
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
            <h2 id="featured-heading">A model race becomes an infrastructure and deployment race.</h2>
            <p>Frontier models keep improving, but the industry’s next test is putting AI to work reliably: through agents, cloud platforms, custom chips, open alternatives and devices people actually want to use.</p>
            <a className="text-link" href="#stories">Browse every section <span aria-hidden="true">↗</span></a>
          </div>
          <span className="featured-number" aria-hidden="true">01</span>
        </div>
      </section>

      <section className="timeline-section" id="timeline" aria-labelledby="timeline-heading">
        <div className="timeline-heading">
          <p className="section-kicker">THE INDUSTRY ARC</p>
          <h2 id="timeline-heading">From chatbots to AI agents<span className="heading-period">.</span></h2>
          <p>Five broad shifts that have brought AI from demos into products, workplaces and infrastructure.</p>
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
          <div><p className="section-kicker">THE COMPLETE BRIEF · 14 STORIES</p><h2 id="stories-heading">Every section<span className="heading-period">.</span></h2></div>
          <button className={`saved-filter${savedOnly ? " is-active" : ""}`} type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly((value) => !value)}>
            <BookmarkIcon filled={savedOnly} /> Saved stories <span className="saved-count">{savedIds.length}</span>
          </button>
        </div>

        <div className="story-tools">
          <label className="search-box"><SearchIcon /><span className="sr-only">Search stories</span>
            <input type="search" placeholder="Search models, agents, chips, companies..." value={search} onChange={(event) => setSearch(event.target.value)} />
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
                  <span className="visual-caption">TECH / AI</span>
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
        <p className="editorial-note">Coverage checked Oct 13, 2026. Company announcements and performance claims are identified as such; independent reporting and research are linked where available. This is a curated industry overview, not an exhaustive live news feed.</p>
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
