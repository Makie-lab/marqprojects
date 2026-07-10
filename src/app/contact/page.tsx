import { Mail, MapPin, Globe } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ContactForm from "@/components/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@marq.dev",
    href: "mailto:hello@marq.dev",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Globe,
    label: "Website",
    value: "marq.dev",
    href: "https://marq.dev",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Contact</h1>
        <p className="text-lg opacity-60">
          Have a project in mind? Let us work together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <GlassCard key={info.label} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-black/5 dark:bg-white/10">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm opacity-50">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium hover:opacity-70 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
