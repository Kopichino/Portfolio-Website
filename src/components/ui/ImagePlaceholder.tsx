"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  label?: string;
}

export function ImagePlaceholder({
  src,
  alt,
  className = "",
  label = "Image Placeholder",
}: ImagePlaceholderProps) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/20 bg-white/95 p-6 text-center text-zinc-800 shadow-md backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:shadow-red-500/10 ${className}`}
    >
      {/* Decorative Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner">
        <ImageIcon className="h-5 w-5" />
      </div>

      <div className="relative z-10 space-y-0.5">
        <p className="text-xs font-bold text-zinc-900 tracking-wide">{label}</p>
        <p className="text-[10px] text-zinc-500 font-medium">{alt}</p>
      </div>

      <div className="relative z-10 mt-1 rounded-full bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-600">
        Upload Image Here
      </div>
    </div>
  );
}
