import { Download } from "lucide-react";
import { profile } from "@/content/resume";

export function ResumeApp() {
  return (
    <div className="flex h-full flex-col bg-zinc-800">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
        <span className="text-xs text-zinc-400">Resume-Koppesh_P.pdf</span>
        <a
          href={profile.resumePdfUrl}
          download
          className="flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 shadow-md shadow-red-600/30"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      </div>
      <embed
        src={profile.resumePdfUrl}
        type="application/pdf"
        className="min-h-0 flex-1"
        title="Resume PDF preview"
      />
    </div>
  );
}
