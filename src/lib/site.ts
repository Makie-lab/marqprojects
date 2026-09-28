/**
 * Central site configuration.
 *
 * Single source of truth for contact endpoints, external integrations, and
 * public metadata. Keeping this in one module means the Gmail / Canva request
 * paths cannot drift between the UI and the API layer.
 */

export const siteConfig = {
  name: "MARQ",
  legalName: "Marco Emmanuel B. Samson",
  title: "MARQ | Marco Emmanuel B. Samson — Front-end Developer & Graphic Designer",
  shortDescription: "Front-end Developer & Graphic Designer",
  description:
    "Portfolio of Marco Emmanuel B. Samson — front-end development, UI/UX design, and publication design. Request visual assets directly via Gmail or Canva.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://marqprojects.vercel.app",
  locale: "en_PH",
  themeColor: "#050816",

  author: {
    name: "Marco Emmanuel B. Samson",
    jobTitle: "Front-end Developer & Graphic Designer",
    location: "Antipolo City, Rizal, Philippines",
    affiliation: "Polytechnic University of the Philippines — Quezon City",
  },

  /** Primary contact channels. */
  contact: {
    email: "mebsamson04@gmail.com",
    phone: "+63 993 419 7371",
    phoneHref: "tel:+639934197371",
    location: "Antipolo City, Rizal",
  },

  /** External profiles / integration targets. */
  social: {
    github: "https://github.com/Makie-lab",
    linkedin:
      "https://www.linkedin.com/in/marco-samson-0185932b2/",
  },

  /**
   * Visual-asset request integrations.
   *
   * Visual Assets are not shipped as downloadable files — they are requested.
   * Both channels below are first-class: Gmail for a written brief, Canva for
   * viewing/duplicating the source design.
   */
  assetRequest: {
    /** Inbox that receives all visual-asset requests. */
    inbox: "mebsamson04@gmail.com",
    /** Public Canva portfolio / team link used for direct design access. */
    canvaUrl: process.env.NEXT_PUBLIC_CANVA_URL ?? "https://www.canva.com/design/",
    /** Canva profile fallback shown when a project has no specific design link. */
    canvaProfileUrl:
      process.env.NEXT_PUBLIC_CANVA_PROFILE_URL ?? "https://www.canva.com/",
    /** Expected turnaround communicated in the UI, kept in one place. */
    responseTime: "1–2 business days",
    /** License terms surfaced on the request dialog. */
    licenseNote:
      "Assets are shared for review and non-commercial reference by default. Commercial licensing available on request.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper for metadata, sitemaps, and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
