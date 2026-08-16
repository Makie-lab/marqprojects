import Link from "next/link";
import type { Metadata } from "next";
import { SearchX, Home, LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-16">
      <div className="text-center max-w-md">
        <SearchX size={44} className="mx-auto mb-5 opacity-30" />
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="opacity-60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="mag-search-btn justify-center">
            <Home size={16} /> Back to homepage
          </Link>
          <Link href="/#projects" className="chip justify-center py-3 px-5">
            <LayoutGrid size={15} /> Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
