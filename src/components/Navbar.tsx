"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Home,
  LayoutGrid,
  User,
  FileText,
  Cpu,
  Mail,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  Icon: typeof Home;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "projects", label: "Projects", Icon: LayoutGrid },
  { id: "about", label: "About", Icon: User },
  { id: "resume", label: "Resume", Icon: FileText },
  { id: "tech-stack", label: "Tech Stack", Icon: Cpu },
  { id: "contact", label: "Contact", Icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string>("home");

  // IntersectionObserver: highlight the section currently in view (only on home).
  useEffect(() => {
    if (!isHome) return;

    const targets = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section crosses roughly a third down from the nav
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Smooth-scroll handler for same-page anchor navigation on home.
  const handleClick = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isHome) return; // Let the browser navigate to `/#id` from other pages.
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        // Update URL hash without triggering another scroll
        history.replaceState(null, "", `#${id}`);
      }
    },
    [isHome]
  );

  return (
    <nav
      aria-label="Primary"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <ul className="nav-pill flex items-center gap-1 px-2 py-2">
        {navItems.map(({ id, label, Icon }) => {
          const href = `/#${id}`;
          const active = isHome && activeId === id;
          return (
            <li key={id}>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                title={label}
                onClick={handleClick(id)}
                className={`nav-icon-btn group relative ${
                  active ? "nav-icon-btn--active" : ""
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                <span className="nav-tooltip">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
