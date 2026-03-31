"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./components/Globe"), { ssr: false });
import { locations } from "./components/locations";

const tabs = ["About", "Projects", "Articles"] as const;
type Tab = (typeof tabs)[number];

export default function Home() {
  const [active, setActive] = useState<Tab>("About");
  const prevIndex = useRef(0);

  const currentIndex = tabs.indexOf(active);
  const direction = currentIndex > prevIndex.current ? 1 : -1;

  const handleTab = (tab: Tab) => {
    prevIndex.current = tabs.indexOf(active);
    setActive(tab);
  };

  return (
    <>
      <nav className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={`px-5 py-3 text-base transition-colors duration-150 cursor-pointer -mb-px ${
              active === tab
                ? "text-orange-600 border-b-2 border-orange-600 font-medium"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: `${d * 40}%`, opacity: 0, scale: 0.98 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: `${d * -40}%`, opacity: 0, scale: 0.98 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {active === "About" && <AboutContent />}
            {active === "Projects" && <ProjectsContent />}
            {active === "Articles" && <ArticlesContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

const places = [
  { label: "Columbus", suffix: "Ohio" },
  { label: "Palo Alto", suffix: "California" },
  { label: "Chandler", suffix: "Arizona" },
  { label: "St. George", suffix: "Utah" },
  { label: "Ivins", suffix: "Utah" },
  { label: "Rochester", suffix: "Minnesota" },
  { label: "Bennington", suffix: "Nebraska" },
  { label: "Gilbert", suffix: "Arizona" },
  { label: "Kaysville", suffix: "Utah" },
  { label: "Manila", suffix: "NCR" },
  { label: "Morong", suffix: "Rizal" },
  { label: "Taguig", suffix: "NCR" },
  { label: "Antipolo", suffix: "Rizal" },
  { label: "Taytay", suffix: "Rizal" },
  { label: "Binangonan", suffix: "Rizal" },
  { label: "Infanta", suffix: "Quezon" },
  { label: "Provo", suffix: "Utah" },
  { label: "San Francisco", suffix: "California" },
];

function CityPhoto({ city, region }: { city: string; region: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const query = `${city}, ${region}`;
    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.thumbnail?.source) {
          // Request a larger version
          setSrc(data.thumbnail.source.replace(/\/\d+px-/, "/400px-"));
        }
      })
      .catch(() => {});
  }, [city, region]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${city}, ${region}`}
      className="w-full"
    />
  );
}

function AboutContent() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelected(selected === label ? null : label);
  };

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-8">
      <div className="lg:flex-1">
        <p className="text-gray-900 text-base leading-relaxed mb-6">
          I&apos;m a BYU student building startups online.
        </p>
        <p className="text-gray-900 text-base leading-relaxed mb-4 lg:mb-0">
          I&apos;ve lived all over the US and the world. Here&apos;s cities
          I&apos;ve lived in:
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5 mb-0 max-w-md">
          {places.map((place, i) => (
            <motion.button
              key={place.label}
              onClick={() => handleClick(place.label)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03, ease: [0.4, 0, 0.2, 1] }}
              className={`px-3 py-1.5 text-sm rounded-full border cursor-pointer transition-all duration-150 ${
                selected === place.label
                  ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {place.label}, {place.suffix}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Middle column - desktop */}
      <div className="w-72 shrink-0 hidden lg:block">
        <AnimatePresence mode="wait">
          {selected && (() => {
            const loc = locations.find((l) => l.label === selected);
            const place = places.find((p) => p.label === selected);
            if (!loc || !place) return null;
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-3"
              >
                <div className="border border-gray-200 rounded bg-white overflow-hidden">
                  <iframe
                    title={`Satellite view of ${selected}`}
                    src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=14&t=k&output=embed`}
                    className="w-full aspect-square"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="px-3 py-2">
                    <p className="text-gray-900 font-medium text-sm">{place.label}, {place.suffix}</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded bg-white overflow-hidden">
                  <CityPhoto city={place.label} region={place.suffix} />
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      <div className="lg:flex-[1.3]">
        <Suspense
          fallback={
            <div className="w-full aspect-square max-w-md mx-auto bg-stone-200 rounded-full animate-pulse" />
          }
        >
          <Globe selectedLabel={selected} />
        </Suspense>
      </div>

      {/* Middle column - mobile (after globe) */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          {selected && (() => {
            const loc = locations.find((l) => l.label === selected);
            const place = places.find((p) => p.label === selected);
            if (!loc || !place) return null;
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex gap-4"
              >
                <div className="flex-1 border border-gray-200 rounded bg-white overflow-hidden">
                  <iframe
                    title={`Satellite view of ${selected}`}
                    src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=14&t=k&output=embed`}
                    className="w-full aspect-square"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="px-3 py-2">
                    <p className="text-gray-900 font-medium text-sm">{place.label}, {place.suffix}</p>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden rounded">
                  <CityPhoto city={place.label} region={place.suffix} />
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

const projects = [
  {
    status: "Active",
    title: "Personal Site",
    domain: "hyrumbradshaw.com",
    url: "https://hyrumbradshaw.com",
    description: "Coming soon: itsjay.us style design (also zenorocha.com, itsthewestend.com, jazzicreates.tv, kick-bass.com)",
  },
  {
    status: "Active",
    title: "Lightfall",
    domain: "lightfall.ai",
    url: "https://lightfall.ai",
    description: "Coming soon: TikTok integration, RAG for successful videos, better design (usecardboard.com, mercor.com)",
  },
  {
    status: "Semi-Active",
    title: "LurnLoop",
    domain: "lurnloop.com",
    url: "https://lurnloop.com",
    description: "Coming soon: all-new AI education app",
  },
  {
    status: "Active",
    title: "Lola",
    domain: "lola.so",
    url: "https://lola.so",
    description: "Coming soon: Seedance 2.0 for educational cartoons (Cocomelon competitor)",
  },
  {
    status: "Active",
    title: "Tadhana",
    domain: "tadhana.app",
    url: "https://tadhana.app",
    description: "Coming soon: OpenClaw on Hetzner hosted here",
  },
  {
    status: "In the Shop",
    title: "Huli",
    domain: "usehuli.com",
    url: "https://usehuli.com",
    description: "Coming soon: agent tools (something like AgentMail or https://www.x402.org/)",
  },
  {
    status: "In the Shop",
    title: "Backbend",
    domain: "backbend.ai",
    url: "https://backbend.ai",
    description: "Coming soon: browser use AI agent (OpenClaw, Zendriver, Multi-On) ... or maybe something like Mercor/SurgeAI",
  },
  {
    status: "In the Shop",
    title: "Lola Finance",
    domain: "lola.finance",
    url: "https://lola.finance",
    description: "Coming soon: stablecoins on-off ramp and digital bank",
  },
];

const statusGroups = ["Active", "Semi-Active", "In the Shop"] as const;

function ProjectsContent() {
  let globalIndex = 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {statusGroups.map((status) => (
        <div key={status} className="overflow-visible">
          <h2 className="text-sm text-gray-500 tracking-wide mb-4 px-3">{status}</h2>
          <ul className="space-y-4">
            {projects
              .filter((p) => p.status === status)
              .map((project) => {
                const idx = globalIndex++;
                return (
                  <motion.li
                    key={project.domain}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.a
                      href={project.url}
                      className="block border border-transparent hover:border-orange-300 hover:rounded p-3 transition-colors duration-150"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                      transition={{ duration: 0.15 }}
                    >
                      <h3 className="text-lg">
                        <span className="text-orange-600">{project.title}</span>
                        <span className="text-gray-400 mx-2">&mdash;</span>
                        <span className="text-gray-900 underline">{project.domain}</span>
                      </h3>
                      <p className="mt-2 text-gray-900 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </motion.a>
                  </motion.li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}

const articles = [
  {
    title: "Your Schedule Is Ruining Your Life (And How to Fix It)",
    description: "A breakdown of how legends like Elon Musk, Kobe Bryant, and Mark Zuckerberg structure their days — and the three values that matter.",
    date: "Mar 24, 2026",
    source: "X",
    url: "https://x.com/hyrumjb3/status/2036516338286600595",
  },
  {
    title: "How to Get Millions of Views With AI UGC",
    description: "Step-by-step guide to creating AI-generated UGC videos. Includes the Cantina case study (68M+ views) and a breakdown of the best tools.",
    date: "Mar 20, 2026",
    source: "X",
    url: "https://x.com/hyrumjb3/status/2035066865467498518",
  },
  {
    title: "The Cable Car Is Picking Up Speed",
    description: "Dispatches from San Francisco on why AI is accelerating faster than anyone expected — and advice for builders riding the wave.",
    date: "Mar 5, 2026",
    source: "X",
    url: "https://x.com/hyrumjb3/status/2029674038235386164",
  },
  {
    title: "Three Weird Traits Scientifically Connected With Geniuses",
    description: "A deep dive into surprising research on what geniuses have in common.",
    views: "31,000 views",
    date: "High School",
    source: "Medium",
    url: "https://medium.com/p/c3239b59474",
  },
  {
    title: "Want to Be a Billionaire? Elon Musk Says to Study Physics",
    description: "Why Elon Musk thinks physics is the ultimate foundation for success.",
    views: "14,000 views",
    date: "High School",
    source: "Medium",
    url: "https://medium.com/p/5803872a7ed0",
  },
];

function ArticlesContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, i) => (
        <motion.a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col border border-gray-200 rounded p-5 hover:border-orange-300 transition-colors duration-150 bg-white"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="tracking-wider">{article.source}</span>
            <span>&middot;</span>
            <span>{article.date}</span>
          </div>
          <h3 className="mt-3 text-gray-900 text-lg font-medium group-hover:text-orange-600 transition-colors duration-150">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {article.description}
          </p>
          {"views" in article && (article as { views?: string }).views && (
            <p className="mt-2 text-xs text-gray-400">
              {(article as { views: string }).views}
            </p>
          )}
        </motion.a>
      ))}
    </div>
  );
}
