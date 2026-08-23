"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  type: 0 | 1 | 2 | 3;
}

const STAR_COUNT = 260;
const CURSOR_RADIUS = 140;

// Lightweight canvas star field with cursor-proximity glow + twinkle.
// Shared between the intro section and the desktop wallpaper (both want the
// same "cool, cursor-reactive" background) — kept here rather than under
// components/intro/ once it had a second caller.
export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999 };

    function makeStars() {
      stars = Array.from({ length: STAR_COUNT }, () => {
        const roll = Math.random();
        const type: Star["type"] = roll < 0.55 ? 0 : roll < 0.8 ? 1 : roll < 0.94 ? 2 : 3;
        const radiusByType = [0.6, 1, 1.5, 2.2][type];
        const alphaByType = [0.35, 0.5, 0.7, 0.95][type];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: radiusByType + Math.random() * 0.4,
          baseAlpha: alphaByType,
          twinkleSpeed: 0.5 + Math.random() * 1.2,
          twinklePhase: Math.random() * Math.PI * 2,
          type,
        };
      });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${star.baseAlpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    let rafId: number;
    let elapsed = 0;

    function draw() {
      elapsed += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / CURSOR_RADIUS);

        const twinkle =
          star.type === 0
            ? 0.85 + Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase) * 0.15
            : 0.7 + Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase) * 0.3;

        const alpha = Math.min(1, star.baseAlpha * twinkle + proximity * 0.6);
        const radius = star.radius + proximity * 1.8;

        if (proximity > 0.15) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(125,211,252,${proximity * 0.25})`;
          ctx.arc(star.x, star.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full bg-[#05070d]"
      aria-hidden
    />
  );
}
