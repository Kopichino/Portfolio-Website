"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/content/resume";

const COMMAND = "cat skills.json";
const TYPE_SPEED_MS = 35;
const CATEGORY_STAGGER_S = 0.12;

function useTypewriter(text: string, speedMs: number) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (text.length === 0) return;
    const interval = setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, speedMs);
    return () => clearInterval(interval);
  }, [text, speedMs]);

  return { typed: text.slice(0, length), done: length >= text.length };
}

export function SkillsApp() {
  const { typed, done } = useTypewriter(COMMAND, TYPE_SPEED_MS);
  const revealDelay = COMMAND.length * (TYPE_SPEED_MS / 1000) + 0.15;

  return (
    <div className="h-full overflow-y-auto bg-black/60 p-5 font-mono text-[13px] text-zinc-200">
      <p className="text-red-400">
        <span className="text-zinc-500">koppesh@portfolio</span>
        <span className="text-zinc-600">:~$</span> {typed}
        {!done && <span className="animate-pulse">▍</span>}
      </p>
      <div className="mt-3 space-y-4">
        {skills.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: revealDelay + index * CATEGORY_STAGGER_S,
            }}
          >
            <p className="text-red-400/80 font-semibold"># {category.label}</p>
            <p className="mt-1 flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-red-500/30 bg-red-950/40 px-2 py-0.5 text-red-200"
                >
                  {item}
                </span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-4 text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: revealDelay + skills.length * CATEGORY_STAGGER_S,
        }}
      >
        <span className="text-zinc-500">koppesh@portfolio</span>
        <span className="text-zinc-600">:~$</span> <span className="animate-pulse">▍</span>
      </motion.p>
    </div>
  );
}
