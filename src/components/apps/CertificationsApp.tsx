import { Trophy } from "lucide-react";
import { certifications } from "@/content/resume";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function CertificationsApp() {
  return (
    <div className="h-full overflow-y-auto p-5 text-zinc-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <div>
                <p className="text-sm font-bold text-white">{cert.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{cert.issuer}</p>
              </div>
            </div>

            {/* Certificate / Hackathon Photo Placeholder */}
            <ImagePlaceholder
              src={cert.image}
              alt={`${cert.title} Certificate`}
              label={`${cert.title} Photo`}
              className="w-full h-36 shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
