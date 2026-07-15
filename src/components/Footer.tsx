import { Globe, Code2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-footer py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center justify-center space-x-4">
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

          {/* Copyright */}
          <p className="text-xs opacity-50 tracking-wide">
            &copy; {new Date().getFullYear()} MARQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
