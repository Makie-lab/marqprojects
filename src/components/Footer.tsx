import { Globe, Code2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-footer py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/*
            Logo - The MARQ logo appears in both the navbar and footer for branding
            consistency. This is a standard design pattern: users see the brand identity
            at the top when they arrive and at the bottom when they finish scrolling,
            reinforcing brand recognition on every page.
          */}
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="flex flex-col leading-none font-black text-sm tracking-tight opacity-80">
              <span>MA</span>
              <span>RQ</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex-1 flex items-center justify-center space-x-4">
            <a
              href="#"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Website"
            >
              <Globe size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Code"
            >
              <Code2 size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/*
            Copyright Notice - This is a standard legal and professional practice for
            portfolio websites. It establishes intellectual property ownership over the
            site content and projects displayed. The year is dynamically generated so
            it always stays current without manual updates.
          */}
          <div className="flex-1 flex justify-center md:justify-end">
            <p className="text-xs opacity-50 tracking-wide">
              &copy; {new Date().getFullYear()} MARQ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
