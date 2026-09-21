import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=0123456789",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-[#ff2b2b] opacity-80",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
    : characters.split("");

  const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
    return originalText
      .split("")
      .map((char, index) => {
        if (char === " " || currentRevealed.has(index)) {
          return char;
        }
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        return availableChars[randomIndex];
      })
      .join("");
  };

  const startAnimation = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const length = text.length;
    const order: number[] = [];

    if (sequential) {
      if (revealDirection === "start") {
        for (let i = 0; i < length; i++) order.push(i);
      } else if (revealDirection === "end") {
        for (let i = length - 1; i >= 0; i--) order.push(i);
      } else {
        const mid = Math.floor(length / 2);
        for (let i = 0; i <= mid; i++) {
          if (mid - i >= 0) order.push(mid - i);
          if (mid + i < length && i !== 0) order.push(mid + i);
        }
      }
    }

    let step = 0;
    const currentRevealed = new Set<number>();

    const interval = setInterval(() => {
      if (sequential) {
        if (step < order.length) {
          currentRevealed.add(order[step]);
          setRevealedIndices(new Set(currentRevealed));
          setDisplayText(shuffleText(text, currentRevealed));
          step++;
        } else {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      } else {
        if (step < maxIterations) {
          const numToReveal = Math.floor((step / maxIterations) * length);
          while (currentRevealed.size < numToReveal) {
            const randIndex = Math.floor(Math.random() * length);
            currentRevealed.add(randIndex);
          }
          setRevealedIndices(new Set(currentRevealed));
          setDisplayText(shuffleText(text, currentRevealed));
          step++;
        } else {
          clearInterval(interval);
          setDisplayText(text);
          setIsScrambling(false);
        }
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            setHasAnimated(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated]);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      setIsHovering(true);
      startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === "hover") {
      setIsHovering(false);
    }
  };

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block cursor-default select-none ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={className}>
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          return (
            <span
              key={index}
              className={!isRevealed ? encryptedClassName : undefined}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
