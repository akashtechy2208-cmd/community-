import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  borderWidth?: number;
  borderRadius?: string;
  animated?: boolean;
  speed?: number;
}

export default function AnimatedBorder({
  children,
  className = "",
  borderColor = "#ff2b2b",
  glowColor = "rgba(255, 43, 43, 0.5)",
  borderWidth = 1,
  borderRadius = "0px",
  animated = true,
  speed = 3,
}: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated SVG border */}
      {animated && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ borderRadius }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={borderColor} stopOpacity={isHovered ? 1 : 0.5} />
              <stop offset="40%" stopColor="transparent" stopOpacity={0} />
              <stop offset="70%" stopColor={borderColor} stopOpacity={isHovered ? 0.8 : 0.3} />
              <stop offset="100%" stopColor={borderColor} stopOpacity={isHovered ? 1 : 0.5} />
              {animated && (
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  values="0 0.5 0.5;360 0.5 0.5"
                  dur={`${speed}s`}
                  repeatCount="indefinite"
                />
              )}
            </linearGradient>
          </defs>
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={`calc(100% - ${borderWidth}px)`}
            height={`calc(100% - ${borderWidth}px)`}
            fill="none"
            stroke="url(#border-gradient)"
            strokeWidth={borderWidth}
          />
        </svg>
      )}

      {/* Glow effect on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ borderRadius }}
        animate={{ boxShadow: isHovered ? `0 0 25px ${glowColor}, inset 0 0 10px ${glowColor}` : "none" }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
