"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const fonts = [
  // Serif
  { name: "Newsreader", family: "Newsreader" },
  { name: "Playfair Display", family: "Playfair+Display" },
  { name: "Noto Serif", family: "Noto+Serif" },
  { name: "PT Serif", family: "PT+Serif" },
  { name: "Libre Baskerville", family: "Libre+Baskerville" },
  { name: "EB Garamond", family: "EB+Garamond" },
  { name: "Lora", family: "Lora" },
  { name: "Merriweather", family: "Merriweather" },
  { name: "Crimson Text", family: "Crimson+Text" },
  { name: "Source Serif 4", family: "Source+Serif+4" },
  // Sans-serif
  { name: "Inter", family: "Inter" },
  { name: "Open Sans", family: "Open+Sans" },
  { name: "Roboto", family: "Roboto" },
  { name: "Montserrat", family: "Montserrat" },
  { name: "Poppins", family: "Poppins" },
  { name: "Raleway", family: "Raleway" },
  { name: "Nunito", family: "Nunito" },
  { name: "Work Sans", family: "Work+Sans" },
  { name: "DM Sans", family: "DM+Sans" },
  { name: "Plus Jakarta Sans", family: "Plus+Jakarta+Sans" },
];

export default function AnimatedHeader() {
  const [font, setFont] = useState("Newsreader");

  useEffect(() => {
    const selected = fonts.find((f) => f.name === font);
    if (!selected) return;

    // Load the font via Google Fonts
    const linkId = "debug-font-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${selected.family}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`;

    // Apply to app root, using !important to override Next.js font class
    const root = document.getElementById("app-root");
    if (root) {
      root.style.setProperty("font-family", `"${selected.name}", serif`, "important");
    }
  }, [font]);

  return (
    <div className="mx-auto flex items-center justify-between">
      <motion.h1
        className="text-gray-900 font-bold text-3xl sm:text-4xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        Hyrum Bradshaw
      </motion.h1>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      >
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded bg-white text-gray-700 cursor-pointer focus:outline-none focus:border-orange-400"
        >
          <optgroup label="Serif">
            {fonts.slice(0, 10).map((f) => (
              <option key={f.name} value={f.name}>
                {f.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Sans-Serif">
            {fonts.slice(10).map((f) => (
              <option key={f.name} value={f.name}>
                {f.name}
              </option>
            ))}
          </optgroup>
        </select>

        <a
          href="https://agent.hyrumbradshaw.com"
          className="px-4 py-1.5 bg-orange-600 text-white text-base rounded hover:bg-orange-700 transition-colors duration-150"
        >
          Agent
        </a>
      </motion.div>
    </div>
  );
}
