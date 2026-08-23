"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { AppDefinition } from "@/lib/window-manager/app-registry";

interface DockIconProps {
  app: AppDefinition;
  isRunning: boolean;
  mouseX: MotionValue<number>;
  onActivate: () => void;
}

export function DockIcon({ app, isRunning, mouseX, onActivate }: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return value - (rect.left + rect.width / 2);
  });

  const sizeSync = useTransform(distance, [-140, 0, 140], [40, 64, 40]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 220, damping: 16 });

  const Icon = app.icon;

  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        type="button"
        aria-label={`Open ${app.title}`}
        onClick={onActivate}
        whileTap={{ scale: 0.88 }}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-white/10 text-white shadow-lg backdrop-blur-md ring-1 ring-white/10 hover:bg-white/15 hover:shadow-sky-400/20"
      >
        <Icon className="h-1/2 w-1/2" />
      </motion.button>
      <motion.span
        className="mt-1 h-1 w-1 rounded-full bg-white"
        initial={false}
        animate={{ opacity: isRunning ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
