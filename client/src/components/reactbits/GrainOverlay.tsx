import { useRef, useEffect, ReactNode } from "react";

interface GrainOverlayProps {
  opacity?: number;
  blendMode?: string;
  className?: string;
}

export default function GrainOverlay({
  opacity = 0.035,
  blendMode = "overlay",
  className = "",
}: GrainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const W = 256;
    const H = 256;
    canvas.width = W;
    canvas.height = H;

    const draw = () => {
      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = (Math.random() * 255) | 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode as any,
        backgroundRepeat: "repeat",
        imageRendering: "pixelated",
        transform: "scale(8)",
        transformOrigin: "top left",
      }}
    />
  );
}
