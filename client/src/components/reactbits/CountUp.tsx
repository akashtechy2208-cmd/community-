import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  padZero?: boolean;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className = "",
  padZero = true,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (inView && !hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
          const currentCount = Math.floor(progress * (to - from) + from);
          setCount(currentCount);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(to);
          }
        };
        window.requestAnimationFrame(step);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [inView, hasStarted, from, to, duration, delay]);

  const formattedCount =
    padZero && count < 10 && count >= 0 ? `0${count}` : `${count}`;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
