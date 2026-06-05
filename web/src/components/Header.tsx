import { Link2 } from "lucide-react";

export function Header() {
  return (
    <div className="mb-10 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-3">
          <Link2 size={22} />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">Slugr</h1>
      </div>

      <p className="text-sm leading-relaxed text-[#a1a1a1]">
        Shorten long URLs into clean minimal links.
      </p>
    </div>
  );
}
