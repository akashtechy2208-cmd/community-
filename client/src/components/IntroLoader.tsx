import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [phase, setPhase] = useState<"logo" | "zoom" | "done">("logo");

  useEffect(() => {
    // Hold logo visible for 2s, then trigger zoom-reveal
    const zoomTimer = setTimeout(() => setPhase("zoom"), 2000);
    // After zoom animation (1s), unmount overlay
    const doneTimer = setTimeout(() => setPhase("done"), 3100);
    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "logo" || phase === "zoom") && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#000" }}
          // Zoom the whole screen forward and fade out on reveal
          animate={
            phase === "zoom"
              ? { scale: 5, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            phase === "zoom"
              ? { duration: 1.0, ease: [0.4, 0, 0.6, 1] }
              : { duration: 0 }
          }
        >
          {/* Scanlines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
            }}
          />

          {/* Pulsing red glow behind logo */}
          <motion.div
            className="absolute"
            style={{
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,43,43,0.22) 0%, rgba(255,43,43,0.08) 50%, transparent 75%)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          />

          {/* Main logo + tagline */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo zooms in from tiny */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                scale: { duration: 1.0, ease: [0.16, 1.2, 0.3, 1] },
                opacity: { duration: 0.35 },
              }}
            >
              {/*
                The uploaded logo has a WHITE background.
                We use a wrapper with black bg + the logo sits inside.
                mix-blend-mode: screen makes the black areas of the image
                transparent and the red/colored logo shows through brightly.
              */}
              <div className="relative">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow:
                      "0 0 60px 20px rgba(255,43,43,0.35), 0 0 120px 40px rgba(255,43,43,0.15)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <img
                  src="/hackspire-logo.jpg"
                  alt="Hackspire"
                  className="h-52 w-52 object-contain sm:h-64 sm:w-64"
                  style={{
                    // screen blend mode: white logo bg disappears, red stays vivid
                    mixBlendMode: "screen",
                    filter:
                      "contrast(1.1) saturate(1.3) drop-shadow(0 0 30px rgba(255,43,43,0.9))",
                  }}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="font-mono text-[10px] uppercase text-white/50"
            >
              Learn · Break · Build
            </motion.p>
          </div>

          {/* HUD corner brackets */}
          {[
            { pos: "top-5 left-5", border: "border-t-2 border-l-2" },
            { pos: "top-5 right-5", border: "border-t-2 border-r-2" },
            { pos: "bottom-5 left-5", border: "border-b-2 border-l-2" },
            { pos: "bottom-5 right-5", border: "border-b-2 border-r-2" },
          ].map(({ pos, border }) => (
            <motion.div
              key={pos}
              className={`absolute h-10 w-10 border-[#ff2b2b]/50 ${pos} ${border}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
            />
          ))}

          {/* Loading bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 overflow-hidden">
            <div className="h-[1px] w-full bg-white/10" />
            <motion.div
              className="h-[1px] bg-[#ff2b2b]"
              style={{ marginTop: "-1px" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "linear" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/30"
            >
              Initializing...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
