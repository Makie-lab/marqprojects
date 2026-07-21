import Link from "next/link";
import { ArrowDown, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/[0.02] to-transparent dark:from-transparent dark:via-white/[0.02] dark:to-transparent pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 animate-fade-in relative z-10">
        {/* Left Side - Text / Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Large stacked branding */}
          <h1 className="font-black text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tighter mb-6">
            <span className="block">MA</span>
            <span className="block">RQ</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl opacity-60 mb-10">
            Front-end Developer &amp; Graphic Designer
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

        {/* Right Side - Profile Picture Card */}
        <div className="flex flex-col items-center">
          <div className="w-[320px] h-[400px] sm:w-[450px] sm:h-[530px] flex flex-col items-center justify-center overflow-hidden rounded-glass-lg border border-white/30 dark:border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.15)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.08)]" style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            {/* Photo placeholder */}
            <div className="w-full flex-1 flex items-center justify-center">
              <User size={80} className="opacity-20 text-gray-400" />
            </div>
            {/* Name and catchphrase inside card */}
            <div className="w-full px-6 pb-6 text-center">
              <p className="text-2xl font-bold text-gray-900">Marco Samson</p>
              <p className="text-sm text-gray-500 italic mt-1">where designer meets code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ArrowDown size={24} className="opacity-40" />
      </div>
    </div>
  );
}
