import { CSSProperties } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`relative inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={
        {
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.2) 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animationDuration,
        } as CSSProperties
      }
    >
      {text}
    </span>
  );
}
