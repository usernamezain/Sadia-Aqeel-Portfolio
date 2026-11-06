import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import opentype from "opentype.js";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SignatureProps {
  /** Text to generate signature for. Defaults to "Sadia Aqeel" */
  text?: string;
  /** Color of the signature path. Defaults to "#37481A" */
  color?: string;
  /** Font size for computing vector glyph paths. Defaults to 64 */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
  /** Optional callback fired when signature animation completes */
  onComplete?: () => void;
}

// Module-level font cache
let cachedFont: opentype.Font | null = null;
let fontLoadPromise: Promise<opentype.Font> | null = null;

async function loadFontWithCache(fontUrl: string): Promise<opentype.Font> {
  if (cachedFont) return cachedFont;
  if (fontLoadPromise) return fontLoadPromise;

  fontLoadPromise = (async () => {
    const urlsToTry = [
      fontUrl,
      "/LastoriaBoldRegular.otf",
      "./LastoriaBoldRegular.otf",
    ];

    for (const url of urlsToTry) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const parsed = opentype.parse(buffer);
          cachedFont = parsed;
          return parsed;
        }
      } catch {
        // Continue to next URL attempt
      }
    }

    return new Promise<opentype.Font>((resolve, reject) => {
      opentype.load(fontUrl, (err, font) => {
        if (err || !font) {
          reject(err || new Error("Could not load font"));
        } else {
          cachedFont = font;
          resolve(font);
        }
      });
    });
  })();

  return fontLoadPromise;
}

export function Signature({
  text = "Sadia Aqeel",
  color = "#37481A",
  fontSize = 64,
  duration = 1.35,
  delay = 0.15,
  className,
  inView = false,
  once = true,
  fontUrl = "/LastoriaBoldRegular.otf",
  onComplete,
}: SignatureProps) {
  const [pathData, setPathData] = useState<string>("");
  const [viewBox, setViewBox] = useState<{ x: number; y: number; w: number; h: number }>({
    x: -32,
    y: -152,
    w: 1025,
    h: 282,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const font = await loadFontWithCache(fontUrl);
        if (isCancelled || !font) return;

        // Generate full path with native kerning and advance metrics
        const path = font.getPath(text, 0, 0, fontSize);
        const bb = path.getBoundingBox();

        // Generous safety padding so tall ascenders, sweeping descenders and flourishes NEVER clip
        const padX = Math.max(34, fontSize * 0.52);
        const padY = Math.max(30, fontSize * 0.48);

        const minX = bb.x1;
        const minY = bb.y1;
        const maxX = bb.x2;
        const maxY = bb.y2;

        const boxWidth = maxX - minX;
        const boxHeight = maxY - minY;

        const vb = {
          x: Math.round((minX - padX) * 10) / 10,
          y: Math.round((minY - padY) * 10) / 10,
          w: Math.round((boxWidth + padX * 2) * 10) / 10,
          h: Math.round((boxHeight + padY * 2) * 10) / 10,
        };

        if (!isCancelled) {
          setViewBox(vb);
          setPathData(path.toPathData(2));
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Signature component font load error:", error);
        if (!isCancelled) {
          setIsLoaded(true);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [text, fontSize, fontUrl]);

  // Handle completion callback safely
  useEffect(() => {
    if (isLoaded && onComplete) {
      const totalAnimationTime = prefersReducedMotion
        ? (delay + 0.35) * 1000
        : (delay + duration + 0.1) * 1000;

      const timer = setTimeout(() => {
        setIsFinished(true);
        onComplete();
      }, totalAnimationTime);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, delay, duration, prefersReducedMotion, onComplete]);

  return (
    <div
      className={cn(
        "signature-container w-full flex items-center justify-center overflow-visible select-none",
        className
      )}
      style={{
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <motion.div
        className="signature-reveal-wrapper overflow-visible"
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 }
        }
        animate={
          inView
            ? prefersReducedMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
            : prefersReducedMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.35 : duration,
          delay,
          ease: [0.22, 1, 0.36, 1], // Organic fluid writing curve
        }}
        onAnimationComplete={() => {
          setIsFinished(true);
        }}
        style={{
          width: "100%",
          maxWidth: "min(560px, 86vw)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
          // Remove clipPath completely once animation completes to avoid any edge clipping
          ...(isFinished ? { clipPath: "none" } : {}),
        }}
      >
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto select-none overflow-visible"
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            maxHeight: "26vh",
            overflow: "visible",
            display: "block",
          }}
          aria-label={text}
          role="img"
        >
          {pathData ? (
            <path d={pathData} fill={color} />
          ) : (
            <text
              x="50%"
              y="55%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={color}
              style={{
                fontFamily: "'Lastoria', cursive, Georgia, serif",
                fontSize: `${fontSize}px`,
              }}
            >
              {text}
            </text>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export default Signature;
