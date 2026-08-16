"use client";

import { useState } from "react";
import { Mail, ExternalLink, Clock, ShieldCheck } from "lucide-react";
import AssetRequestDialog from "@/components/AssetRequestDialog";
import { buildCanvaUrl } from "@/lib/assetRequest";
import { siteConfig } from "@/lib/site";
import type { Project } from "@/data/projects";

/**
 * Acquisition panel shown on request-only (Visual Assets) project pages.
 * Surfaces both integrations explicitly: Gmail for a brief, Canva for the design.
 */
export default function AssetRequestPanel({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const canvaUrl = buildCanvaUrl(project.canvaUrl);

  return (
    <>
      <div className="glass-card p-6 mb-10">
        <p className="eyebrow mb-2">Available on request</p>
        <h2 className="text-lg font-bold mb-2">Request these visual assets</h2>
        <p className="text-sm opacity-65 mb-5 max-w-xl">
          These materials are shared directly rather than downloaded. Send a short
          brief through Gmail, or open the design on Canva to view it first.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setOpen(true)} className="mag-search-btn justify-center">
            <Mail size={16} /> Request via Gmail
          </button>
          <a
            href={canvaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chip justify-center py-3 px-5"
          >
            <ExternalLink size={15} /> View on Canva
          </a>
        </div>

        <div className="flex flex-col gap-1.5 mt-5 text-xs opacity-55">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> Replies within {siteConfig.assetRequest.responseTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} /> {siteConfig.assetRequest.licenseNote}
          </span>
        </div>
      </div>

      <AssetRequestDialog
        project={project}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
