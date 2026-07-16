import { Mail, MapPin, Phone, ChevronDown } from "lucide-react";
import ContactForm from "@/components/ContactForm";

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type IconComponent = React.ComponentType<{ size?: number }>;

interface ContactInfoItem {
  icon: IconComponent;
  label: string;
  value: string;
  href: string | null;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "mebsamson04@gmail.com",
    href: "mailto:mebsamson04@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0993-419-7371",
    href: "tel:09934197371",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Antipolo City, Rizal",
    href: null,
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/Makie-lab",
    href: "https://github.com/Makie-lab",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Marco Emmanuel B. Samson",
    href: "https://www.linkedin.com/in/marco-emmanuel-b-samson-0185932b2/",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero / Contact Info Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">
            Marco Emmanuel B. Samson
          </h1>
          <p className="text-xl sm:text-2xl opacity-60 mb-10">
            Let&apos;s work together
          </p>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="glass-card p-4 flex items-center gap-3 glass-hover"
                >
                  <div className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs opacity-50 uppercase tracking-wide">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-sm hover:opacity-70 transition-opacity truncate block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm truncate">{info.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
          <span className="text-xs uppercase tracking-widest mb-2">Send a message</span>
          <ChevronDown size={24} className="animate-bounce-slow" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-8 animate-fade-in text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Send me a message</h2>
          <p className="opacity-60">
            Fill out the form below and I will get back to you as soon as possible.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
