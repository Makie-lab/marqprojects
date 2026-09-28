import Image from "next/image";
import { ArrowDownRight, Code2, Sparkles } from "lucide-react";

function MarqCardMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`identity-card__index ${inverted ? "identity-card__index--inverted" : ""}`}
      aria-hidden="true"
    >
      <span>MA</span>
      <span>RQ</span>
      <Sparkles size={10} strokeWidth={1.8} />
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="section-scroll hero-space min-h-[calc(100vh-2rem)] flex items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:pt-28"
    >
      <div className="hero-space__halo" aria-hidden="true" />
      <div className="hero-space__planet" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 animate-fade-in">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/75">
            <Sparkles size={13} aria-hidden="true" />
            Creative systems · digital orbit
          </div>

          <h1 className="hero-wordmark font-black text-7xl sm:text-8xl lg:text-9xl leading-[0.78] tracking-[-0.09em] mb-8">
            <span className="block">MA</span>
            <span className="block ml-[0.34em]">RQ</span>
          </h1>

          <p className="max-w-lg text-lg sm:text-xl text-slate-300/70 mb-10 leading-relaxed">
            I&apos;m Marco — a front-end developer and graphic designer turning
            thoughtful ideas into digital experiences with their own gravity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#projects" className="mag-search-btn px-7">
              Explore projects <ArrowDownRight size={16} />
            </a>
            <a href="#contact" className="chip px-7 py-3">
              Start a transmission
            </a>
          </div>
        </div>

        <figure className="identity-card">
          <div className="identity-card__photo">
            <Image
              src="/marq-portrait.png"
              alt="Marco Samson reflected in a laptop screen"
              fill
              priority
              sizes="(max-width: 767px) 86vw, 390px"
              className="identity-card__image"
            />
            <div className="identity-card__photo-vignette" aria-hidden="true" />
          </div>

          <MarqCardMark />
          <MarqCardMark inverted />

          <span className="identity-card__edition" aria-hidden="true">
            No. 01 · MARQ
          </span>

          <figcaption className="identity-card__copy">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/75 mb-1.5">
              Player one
            </p>
            <p className="text-xl sm:text-2xl font-bold">Marco Samson</p>
            <p className="mt-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200/65">
              <Code2 size={14} /> Design meets code
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
