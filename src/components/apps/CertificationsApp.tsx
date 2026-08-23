import { Trophy } from "lucide-react";
import { certifications } from "@/content/resume";

export function CertificationsApp() {
  return (
    <div className="h-full overflow-y-auto p-5 text-zinc-200">
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li
            key={cert.id}
            className="flex items-start gap-3 rounded-lg bg-white/[0.04] p-3"
          >
            <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <p className="text-sm font-medium text-white">{cert.title}</p>
              <p className="text-xs text-zinc-400">{cert.issuer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
