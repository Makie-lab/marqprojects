import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: "standard" | "subtle";
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  variant = "standard",
  className,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        variant === "standard" ? "glass-card" : "glass-card-subtle",
        hover && "glass-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
