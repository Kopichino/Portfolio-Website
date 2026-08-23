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
  color: string;
  type: 0 | 1 | 2 | 3;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  dx: number;
  dy: number;
  alpha: number;
}

const STAR_COUNT = 300;
const CURSOR_RADIUS = 160;
const NEBULA_COUNT = 3;

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
    let meteors: Meteor[] = [];
    const mouse = { x: -9999, y: -9999 };

    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(239, 68, 68, ",  // red-500
      "rgba(248, 113, 113, ", // red-400
      "rgba(252, 165, 165, ", // red-300
    ];

    function makeStars() {
      stars = Array.from({ length: STAR_COUNT }, () => {
        const roll = Math.random();
        const type: Star["type"] = roll < 0.5 ? 0 : roll < 0.75 ? 1 : roll < 0.92 ? 2 : 3;
        const radiusByType = [0.8, 1.3, 1.9, 2.6][type];
        const alphaByType = [0.4, 0.6, 0.8, 0.95][type];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: radiusByType + Math.random() * 0.5,
          baseAlpha: alphaByType,
          twinkleSpeed: 0.6 + Math.random() * 1.4,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          type,
        };
      });
    }

    function createMeteor() {
      if (meteors.length >= 2 || Math.random() > 0.03) return;
      const startX = Math.random() * width * 1.2 - width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
      const speed = 12 + Math.random() * 10;
      meteors.push({
        x: startX,
        y: startY,
        length: 80 + Math.random() * 100,
        speed,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
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
        ctx.fillStyle = `${star.color}${star.baseAlpha})`;
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

      // 1. Draw glowing background crimson nebulae
      const nebulae = [
        {
          x: width * 0.25 + Math.sin(elapsed * 0.3) * 60,
          y: height * 0.3 + Math.cos(elapsed * 0.2) * 50,
          r: width * 0.45,
          color1: "rgba(220, 38, 38, 0.12)",
          color2: "rgba(0, 0, 0, 0)",
        },
        {
          x: width * 0.75 + Math.cos(elapsed * 0.25) * 70,
          y: height * 0.6 + Math.sin(elapsed * 0.35) * 60,
          r: width * 0.5,
          color1: "rgba(185, 28, 28, 0.10)",
          color2: "rgba(0, 0, 0, 0)",
        },
        {
          x: width * 0.5 + Math.sin(elapsed * 0.15) * 40,
          y: height * 0.8 + Math.cos(elapsed * 0.2) * 40,
          r: width * 0.4,
          color1: "rgba(153, 27, 27, 0.09)",
          color2: "rgba(0, 0, 0, 0)",
        },
      ];

      for (const neb of nebulae) {
        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
        grad.addColorStop(0, neb.color1);
        grad.addColorStop(1, neb.color2);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Collect nearby stars for constellation connections near cursor
      const nearbyStars: Star[] = [];

      for (const star of stars) {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / CURSOR_RADIUS);

        if (dist < CURSOR_RADIUS) {
          nearbyStars.push(star);
        }

        const twinkle =
          star.type === 0
            ? 0.85 + Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase) * 0.15
            : 0.65 + Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase) * 0.35;

        const alpha = Math.min(1, star.baseAlpha * twinkle + proximity * 0.55);
        const radius = star.radius + proximity * 1.6;

        if (proximity > 0.1) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(239, 68, 68, ${proximity * 0.35})`;
          ctx.arc(star.x, star.y, radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `${star.color}${alpha})`;
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw constellation connection lines (crimson red)
      for (let i = 0; i < nearbyStars.length; i++) {
        for (let j = i + 1; j < nearbyStars.length; j++) {
          const s1 = nearbyStars[i];
          const s2 = nearbyStars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(239, 68, 68, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw red meteors
      createMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.dx / m.speed) * m.length;
        const tailY = m.y - (m.dy / m.speed) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.3, `rgba(239, 68, 68, ${m.alpha * 0.85})`);
        meteorGrad.addColorStop(1, "rgba(239, 68, 68, 0)");

        ctx.beginPath();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2;
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
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
      className="absolute inset-0 h-full w-full bg-black"
      aria-hidden
    />
  );
}

