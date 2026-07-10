import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/[0.02] to-transparent dark:from-transparent dark:via-white/[0.02] dark:to-transparent pointer-events-none" />

      <div className="text-center animate-fade-in relative z-10">
        {/* Large stacked branding */}
        <h1 className="font-black text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tighter mb-6">
          <span className="block">MA</span>
          <span className="block">RQ</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl opacity-60 mb-10">
          Full-Stack Developer &amp; Designer
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/projects"
            className="glass-card px-8 py-3 font-medium hover:opacity-80 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 font-medium rounded-glass transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ArrowDown size={24} className="opacity-40" />
      </div>
    </div>
  );
}
