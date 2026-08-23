"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/content/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex h-full flex-col text-zinc-200">
      <div className="space-y-2 border-b border-white/10 px-5 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-zinc-500">To:</span>
          <span className="text-zinc-200">{profile.email}</span>
          <button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="ml-auto flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/15"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0 text-zinc-500">Subject:</span>
          <span className="text-zinc-200">Let&apos;s work together</span>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-5 text-sm">
        <p className="text-zinc-300">
          Reach out directly by email, or find me on LinkedIn and GitHub below.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex w-fit items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 shadow-md shadow-red-600/30"
        >
          Send Email
        </a>
        <div className="flex gap-3 pt-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/15"
          >
            <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/15"
          >
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
