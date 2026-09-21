import { useState, useRef } from "react";

interface LetterSwapProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
  characters?: string;
  speed?: number;
}

export default function LetterSwap({
  text,
  className = "",
  encryptedClassName = "text-[#ff2b2b]",
  characters = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  speed = 30,
}: LetterSwapProps) {
  const [displayText, setDisplayText] = useState(text);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const intervalsRef = useRef<Map<number, ReturnType<typeof setInterval>>>(new Map());

  const handleMouseEnter = () => {
    text.split("").forEach((_, index) => {
      if (text[index] === " ") return;

      let iterations = 0;
      const maxIter = 6;

      const interval = setInterval(() => {
        setActiveIndices((prev) => new Set([...Array.from(prev), index]));
        setDisplayText((prev) => {
          const arr = prev.split("");
          arr[index] = characters[Math.floor(Math.random() * characters.length)];
          return arr.join("");
        });

        iterations++;
        if (iterations >= maxIter) {
          clearInterval(interval);
          intervalsRef.current.delete(index);
          setActiveIndices((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
          setDisplayText((prev) => {
            const arr = prev.split("");
            arr[index] = text[index];
            return arr.join("");
          });
        }
      }, speed + index * 10);

      intervalsRef.current.set(index, interval);
    });
  };

  const handleMouseLeave = () => {
    intervalsRef.current.forEach((interval) => clearInterval(interval));
    intervalsRef.current.clear();
    setDisplayText(text);
    setActiveIndices(new Set());
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-default inline-block ${className}`}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={activeIndices.has(i) ? encryptedClassName : undefined}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
