import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string; filter?: string };
  animationTo?: { opacity: number; transform: string; filter?: string };
  easing?: [number, number, number, number] | string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  splitBy?: "characters" | "words";
}

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, transform: "translate3d(0,30px,0)", filter: "blur(8px)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)", filter: "blur(0px)" },
  textAlign = "left",
  splitBy = "characters",
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const items = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={animationFrom}
          animate={isInView ? animationTo : animationFrom}
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {item === " " ? "\u00A0" : item}
          {splitBy === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}
