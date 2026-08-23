"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";

interface InteractivePortraitProps {
  frontImage?: string;
  bgImage?: string;
  alt?: string;
  className?: string;
  maskRadius?: number;
}

/**
 * LorenzoInteractivePortrait / Face Reveal Portrait Component
 * Features a spring-animated feathered radial mask that reveals the background image
 * smoothly beneath the cursor on mousemove or touchmove.
 */
export function InteractivePortrait({
  frontImage = "/kopi_mask.png",
  bgImage = "/kopi_nomask.png",
  alt = "Koppesh P Portrait",
  className = "",
  maskRadius = 180,
}: InteractivePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const isHovered = useMotionValue(0);

  // Requirements state: spring transition with type: 'spring', stiffness: 150, damping: 20
  const springConfig = { type: "spring", stiffness: 150, damping: 20 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const targetRadius = useTransform(isHovered, [0, 1], [0, maskRadius]);
  const smoothRadius = useSpring(targetRadius, springConfig);

  // Radial mask gradient creating a smooth, feathered circular reveal lens
  const maskImage = useMotionTemplate`radial-gradient(circle ${smoothRadius}px at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 100%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    isHovered.set(1);
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    isHovered.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden rounded-3xl cursor-crosshair select-none touch-none border border-red-500/40 bg-black/60 shadow-2xl shadow-red-600/30 backdrop-blur-md group ${className}`}
    >
      {/* Default Front Image */}
      <img
        src={frontImage}
        alt={alt}
        className="h-full w-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"
      />

      {/* Revealed Background Image under Cursor Feathered Mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      >
        <img
          src={bgImage}
          alt={`${alt} revealed`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </motion.div>

      {/* Neon red border glow on hover */}
      <div className="absolute inset-0 rounded-3xl border border-red-500/0 transition-colors duration-300 group-hover:border-red-500/60 pointer-events-none" />
      
      {/* Interactive prompt hint badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-red-500/40 bg-black/80 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-red-200 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md shadow-red-500/20">
        Hover to reveal
      </div>
    </div>
  );
}
