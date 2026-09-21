import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  className?: string;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted Card Image",
  captionText,
  containerHeight = "100%",
  containerWidth = "100%",
  scaleOnHover = 1.03,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
    >
      <motion.div
        style={{
          rotateY: useSpring(useMotionValue(0), { stiffness: 300, damping: 30 }),
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: isHovered ? mouseYSpring.get() * -rotateAmplitude * 2 : 0,
          rotateY: isHovered ? mouseXSpring.get() * rotateAmplitude * 2 : 0,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full w-full overflow-hidden border border-[#ff2b2b]/40 shadow-2xl transition-all duration-200"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover"
        />

        {/* Dynamic glare highlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.25 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 43, 43, 0.2) 40%, transparent 80%)`,
          }}
        />

        {overlayContent && (
          <div className="absolute inset-0 pointer-events-none">
            {overlayContent}
          </div>
        )}

        {showTooltip && captionText && (
          <div
            className={`absolute bottom-3 left-3 right-3 border border-white/20 bg-black/80 px-3 py-1.5 backdrop-blur-md transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/90">
              {captionText}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
