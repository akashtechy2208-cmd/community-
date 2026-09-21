import { useEffect, useRef, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  enabled?: boolean;
  speed?: "slow" | "medium" | "fast";
}

export default function GlitchText({
  text,
  className = "",
  enabled = true,
  speed = "medium",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const speedMap = { slow: 4000, medium: 2500, fast: 1200 };
  const glitchDuration = speedMap[speed];

  useEffect(() => {
    if (!enabled) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    };

    intervalRef.current = setInterval(triggerGlitch, glitchDuration);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled, glitchDuration]);

  if (!enabled || !isGlitching) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Red glitch layer */}
      <span
        className="absolute inset-0 text-[#ff2b2b] z-20"
        style={{
          clipPath: `inset(${Math.random() * 30 + 20}% 0 ${Math.random() * 20}% 0)`,
          transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
          opacity: 0.8,
        }}
        aria-hidden
      >
        {text}
      </span>

      {/* Cyan glitch layer */}
      <span
        className="absolute inset-0 z-20"
        style={{
          color: "#00ffff",
          clipPath: `inset(${Math.random() * 20}% 0 ${Math.random() * 30 + 20}% 0)`,
          transform: `translateX(${(Math.random() - 0.5) * -6}px)`,
          opacity: 0.5,
        }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}
