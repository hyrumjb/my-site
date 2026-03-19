"use client";

import { useState, useRef, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./components/Globe"), { ssr: false });

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
      <nav className="flex gap-1 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={`px-3 py-1.5 text-sm transition-colors duration-150 cursor-pointer ${
              active === tab
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-900"
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
              enter: (d: number) => ({ x: `${d * 40}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -40}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
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

function AboutContent() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelected(selected === label ? null : label);
  };

  return (
    <div>
      <p className="text-gray-900 text-base leading-relaxed mb-6">
        I&apos;m a BYU student building startups online.
      </p>
      <p className="text-gray-900 text-base leading-relaxed mb-8">
        I&apos;ve lived all over the US and the world. Here&apos;s cities
        I&apos;ve lived in:{" "}

        {places.map((place, i) => (
          <span key={place.label}>
            {i === places.length - 1 && "and "}
            <button
              onClick={() => handleClick(place.label)}
              className={`cursor-pointer transition-colors duration-150 ${
                selected === place.label
                  ? "text-orange-600 underline"
                  : "hover:text-orange-600 hover:underline"
              }`}
            >
              {place.label}, {place.suffix}
            </button>
            {i < places.length - 1 ? "; " : "."}
          </span>
        ))}
      </p>
      <Suspense
        fallback={
          <div className="w-full aspect-square max-w-md mx-auto bg-stone-200 rounded-full animate-pulse" />
        }
      >
        <Globe selectedLabel={selected} />
      </Suspense>
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
    status: "Semi-Active",
    title: "Lola",
    domain: "lola.so",
    url: "https://lola.so",
    description: "Coming soon: Seedance 2.0 for educational cartoons (Cocomelon competitor)",
  },
  {
    status: "In the Shop",
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
    description: "Coming soon: agent tools (something like AgentMail)",
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

function ProjectsContent() {
  return (
    <ul className="max-w-2xl space-y-6">
      {projects.map((project) => (
        <li key={project.domain} className="border-b border-gray-200 last:border-b-0">
          <a
            href={project.url}
            className="block border border-transparent hover:border-orange-300 hover:rounded-lg transition-all duration-150"
          >
            <div className="flex items-start gap-6 py-6">
              <span className="w-28 shrink-0 text-sm text-gray-500 tracking-wide pl-3">
                {project.status}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl">
                  <span className="text-orange-600">{project.title}</span>
                  <span className="text-gray-400 mx-2">&mdash;</span>
                  <span className="text-gray-900 underline">{project.domain}</span>
                </h3>
                <p className="mt-3 text-gray-900 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

function ArticlesContent() {
  return (
    <ul className="list-disc list-inside pl-4 space-y-4">
      <li>
        <a
          href="https://medium.com/p/c3239b59474"
          className="text-orange-600 underline hover:text-orange-700"
        >
          Three Weird Traits Scientifically Connected With Geniuses
        </a>{" "}
        / high school article with 31,000 views
      </li>
      <li>
        <a
          href="https://medium.com/p/5803872a7ed0"
          className="text-orange-600 underline hover:text-orange-700"
        >
          Want to Be a Billionaire? Elon Musk Says to Study Physics
        </a>{" "}
        / high school article with 14,000 views
      </li>
    </ul>
  );
}
