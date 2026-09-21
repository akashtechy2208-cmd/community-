import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  trigger?: "hover" | "click";
  direction?: "horizontal" | "vertical";
}

export default function FlipCard({
  front,
  back,
  className = "",
  trigger = "hover",
  direction = "horizontal",
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (trigger === "click") setIsFlipped(!isFlipped);
  };

  const handleHover = (flipped: boolean) => {
    if (trigger === "hover") setIsFlipped(flipped);
  };

  const rotateAxis = direction === "horizontal" ? "rotateY" : "rotateX";

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: "1000px" }}
      onClick={handleClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", position: "relative" }}
        animate={{ [rotateAxis]: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0.2, 0.2, 1.2] }}
        className="w-full h-full"
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="w-full h-full"
        >
          {front}
        </div>

        {/* Back face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: direction === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
            position: "absolute",
            inset: 0,
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
