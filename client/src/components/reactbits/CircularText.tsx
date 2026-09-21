import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CircularTextProps {
  text: string;
  radius?: number;
  speed?: number;
  fontSize?: number;
  className?: string;
  color?: string;
}

export default function CircularText({
  text,
  radius = 60,
  speed = 10,
  fontSize = 10,
  className = "",
  color = "rgba(255,255,255,0.4)",
}: CircularTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const chars = text.split("");
  const angleStep = 360 / chars.length;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {chars.map((char, i) => {
          const angle = i * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad - Math.PI / 2);
          const y = radius * Math.sin(rad - Math.PI / 2);

          return (
            <span
              key={i}
              className="absolute font-mono uppercase tracking-widest"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%)) rotate(${angle}deg)`,
                fontSize,
                color,
                letterSpacing: "0.12em",
              }}
            >
              {char}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
