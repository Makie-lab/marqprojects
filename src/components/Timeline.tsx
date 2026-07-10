interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-foreground/60 border-2 border-background" style={{ backgroundColor: 'var(--foreground)', opacity: 0.6 }} />

            {/* Card */}
            <div className="glass-card p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold">{item.title}</h3>
                <span className="text-sm opacity-50">{item.date}</span>
              </div>
              <p className="text-sm font-medium opacity-70 mb-2">{item.subtitle}</p>
              <p className="text-sm opacity-60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
