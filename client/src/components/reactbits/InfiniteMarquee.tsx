import { ReactNode } from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  children,
  speed = 35,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div
      className={`flex overflow-hidden select-none ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
    >
      <motion.div
        className="flex shrink-0 gap-0"
        animate={{ x: direction === "left" ? [0, "-25%"] : ["-25%", "0%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        style={{ willChange: "transform" }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {items.map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
