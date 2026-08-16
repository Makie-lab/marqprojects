"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Mail,
  ExternalLink,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { ASSET_USE_CASES, type AssetChannel } from "@/lib/schemas";
import {
  buildCanvaUrl,
  buildGmailComposeUrl,
  buildMailtoUrl,
} from "@/lib/assetRequest";
import { siteConfig } from "@/lib/site";
import type { Project } from "@/data/projects";

interface AssetRequestDialogProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

interface ApiEnvelope {
  ok: boolean;
  data?: {
    channels?: { gmail: string; mailto: string; canva: string };
    delivery?: string;
    responseTime?: string;
  };
  error?: { message: string; fields?: Record<string, string> };
}

/**
 * Public wrapper.
 *
 * Rendered through a portal attached to `document.body`. This is essential:
 * ancestors in this app use `backdrop-filter` (`.glass-card`) and a retained
 * `transform` from `.animate-fade-in` (its keyframes end at `translateY(0)`
 * with `fill-mode: forwards`). Either of those makes the ancestor the
 * containing block for `position: fixed` descendants, which previously
 * collapsed the full-screen overlay down to the card's box and rendered as a
 * black rectangle. Portalling to `body` removes that class of bug entirely.
 *
 * Mounting is gated on `open` and keyed by project, so every open starts with
 * fresh state without resetting state inside an effect.
 */
export default function AssetRequestDialog({
  project,
  open,
  onClose,
}: AssetRequestDialogProps) {
  // `open` only flips true from a client click, so `document` is always present
  // here; the guard just makes the SSR contract explicit.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <AssetRequestDialogPanel
      key={project.id}
      project={project}
      onClose={onClose}
    />,
    document.body
  );
}

function AssetRequestDialogPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [channel, setChannel] = useState<AssetChannel>("gmail");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [handoff, setHandoff] = useState<{
    gmail: string;
    mailto: string;
    canva: string;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    useCase: ASSET_USE_CASES[0] as (typeof ASSET_USE_CASES)[number],
    details: "",
    company: "", // honeypot
  });

  // Close on Escape, lock background scroll, and move focus into the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Lock scroll without the layout shift caused by the scrollbar vanishing.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus the panel so screen readers and keyboard users land inside it.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const ctx = {
    projectTitle: project.title,
    projectId: project.id,
    name: form.name || undefined,
    email: form.email || undefined,
    organization: form.organization || undefined,
    useCase: form.useCase,
    details: form.details || undefined,
  };

  const gmailUrl = handoff?.gmail ?? buildGmailComposeUrl(ctx);
  const mailtoUrl = handoff?.mailto ?? buildMailtoUrl(ctx);
  const canvaUrl = handoff?.canva ?? buildCanvaUrl(project.canvaUrl);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMessage("");

    try {
      const res = await fetch("/api/asset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          projectId: project.id,
          projectTitle: project.title,
          name: form.name,
          email: form.email,
          organization: form.organization,
          useCase: form.useCase,
          details: form.details,
          company: form.company,
        }),
      });

      const json = (await res.json()) as ApiEnvelope;

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrors(json.error?.fields ?? {});
        setServerMessage(
          json.error?.message ?? "Something went wrong. Please try again."
        );
        return;
      }

      if (json.data?.channels) setHandoff(json.data.channels);
      setStatus("success");

      // Open the chosen channel immediately — this is the actual hand-off.
      const target =
        channel === "canva"
          ? (json.data?.channels?.canva ?? canvaUrl)
          : (json.data?.channels?.gmail ?? gmailUrl);
      window.open(target, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error. You can still reach me directly using the buttons below."
      );
    }
  }

  return (
    <div
      className="dialog-root"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="dialog-backdrop" aria-hidden="true" onClick={onClose} />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="dialog-panel"
      >
        {/* Header */}
        <div className="dialog-header">
          <div className="min-w-0">
            <p className="eyebrow mb-1">Request assets</p>
            <h2 id={titleId} className="text-lg font-bold leading-tight truncate">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full hover:bg-black/5 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-5">
          {status === "success" ? (
            /* ---------- SUCCESS ---------- */
            <div className="text-center py-4">
              <CheckCircle2 size={44} className="mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-bold mb-2">Request sent</h3>
              <p className="text-sm opacity-65 mb-6 max-w-sm mx-auto">
                {channel === "canva"
                  ? "Canva is opening in a new tab. I've also logged your request and will follow up"
                  : "Gmail is opening in a new tab with your brief pre-filled. Send it and I'll reply"}{" "}
                within {siteConfig.assetRequest.responseTime}.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={channel === "canva" ? canvaUrl : gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mag-search-btn justify-center w-full"
                >
                  {channel === "canva" ? (
                    <>
                      <ExternalLink size={16} /> Reopen Canva
                    </>
                  ) : (
                    <>
                      <Mail size={16} /> Reopen Gmail
                    </>
                  )}
                </a>
                <a
                  href={mailtoUrl}
                  className="chip justify-center w-full py-3"
                >
                  Use my default mail app instead
                </a>
                <button onClick={onClose} className="text-sm opacity-60 hover:opacity-100 mt-2">
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ---------- FORM ---------- */
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-sm opacity-65 mb-5">
                Visual assets are shared on request. Choose how you&apos;d like to
                reach me — Gmail for a written brief, or Canva to view the design
                directly.
              </p>

              {/* Channel selector */}
              <fieldset className="mb-5">
                <legend className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">
                  Request via
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  <ChannelOption
                    active={channel === "gmail"}
                    onSelect={() => setChannel("gmail")}
                    icon={<Mail size={18} />}
                    label="Gmail"
                    hint="Send a brief"
                  />
                  <ChannelOption
                    active={channel === "canva"}
                    onSelect={() => setChannel("canva")}
                    icon={<ExternalLink size={18} />}
                    label="Canva"
                    hint="View design"
                  />
                </div>
              </fieldset>

              {serverMessage ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 mb-4 rounded-glass bg-red-500/10 border border-red-500/20 text-red-700"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span className="text-sm">{serverMessage}</span>
                </div>
              ) : null}

              <div className="space-y-4">
                <Field
                  label="Name"
                  id="ar-name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Email"
                  id="ar-email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="you@example.com"
                  required
                />
                <Field
                  label="Organization"
                  id="ar-org"
                  value={form.organization}
                  onChange={(v) => update("organization", v)}
                  error={errors.organization}
                  placeholder="Optional"
                />

                <div>
                  <label
                    htmlFor="ar-usecase"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Intended use
                  </label>
                  <select
                    id="ar-usecase"
                    value={form.useCase}
                    onChange={(e) =>
                      update("useCase", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-glass bg-black/5 border border-black/10 focus:outline-none focus:border-black/40 transition-colors"
                  >
                    {ASSET_USE_CASES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ar-details"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Details <span className="opacity-50 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="ar-details"
                    rows={3}
                    value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    placeholder="Formats needed, deadline, sizes…"
                    className="w-full px-4 py-2.5 rounded-glass bg-black/5 border border-black/10 focus:outline-none focus:border-black/40 transition-colors resize-none"
                  />
                </div>

                {/* Honeypot — hidden from humans and assistive tech */}
                <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
                  <label htmlFor="ar-company">Company</label>
                  <input
                    id="ar-company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </div>
              </div>

              {/* Trust row */}
              <div className="flex flex-col gap-1.5 mt-5 text-xs opacity-55">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> Replies within {siteConfig.assetRequest.responseTime}
                </span>
                <span className="inline-flex items-start gap-1.5">
                  <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                  <span>{siteConfig.assetRequest.licenseNote}</span>
                </span>
              </div>

              {/* Sticky action bar keeps the primary CTA reachable without
                  scrolling, even when the form overflows a short viewport. */}
              <div className="dialog-footer">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mag-search-btn w-full justify-center disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : channel === "canva" ? (
                    <>
                      <ExternalLink size={16} /> Request &amp; open Canva
                    </>
                  ) : (
                    <>
                      <Mail size={16} /> Request via Gmail
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center opacity-45 mt-2.5">
                  Or email{" "}
                  <a href={mailtoUrl} className="underline">
                    {siteConfig.assetRequest.inbox}
                  </a>{" "}
                  directly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */

function ChannelOption({
  active,
  onSelect,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
        active
          ? "border-black bg-black text-white"
          : "border-black/12 bg-white hover:bg-black/[0.03]"
      }`}
    >
      <span className={active ? "text-white" : "opacity-70"}>{icon}</span>
      <span className="text-sm font-semibold leading-none">{label}</span>
      <span className={`text-[11px] ${active ? "text-white/70" : "opacity-50"}`}>
        {hint}
      </span>
    </button>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
        {required ? <span className="opacity-40"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-2.5 rounded-glass bg-black/5 border transition-colors focus:outline-none ${
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-black/10 focus:border-black/40"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
