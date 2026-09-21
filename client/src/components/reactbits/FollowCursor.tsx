import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FollowCursorProps {
  label?: string;
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
}

export default function FollowCursor({
  label,
  color = "rgba(255, 43, 43, 0.8)",
  size = 32,
  blur = 0,
  className = "",
}: FollowCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX - size / 2);
    cursorY.set(e.clientY - size / 2);
  };

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        style={{
          left: springX,
          top: springY,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: "50%",
          position: "fixed",
          pointerEvents: "none",
          filter: blur ? `blur(${blur}px)` : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference",
        }}
      >
        {label && (
          <span className="font-mono text-[8px] uppercase tracking-widest text-white">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
