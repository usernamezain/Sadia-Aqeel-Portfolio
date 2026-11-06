import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Signature } from "./Signature";
import { usePageResourceLoader } from "../hooks/usePageResourceLoader";

const SESSION_KEY = "hasSeenPreloader";

export function Preloader() {
  const { progress, isComplete, shouldShow } = usePageResourceLoader({
    minDisplayTime: 3200, // Guarantees the signature completes its graceful calligraphy stroke
    safetyTimeout: 8500,  // Prevents trapping the user under any network lag
  });

  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // When loading finishes, trigger the coordinated upward wipe exit
  useEffect(() => {
    if (isComplete && !isExiting && shouldShow) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 200);

      return () => clearTimeout(exitTimer);
    }
  }, [isComplete, isExiting, shouldShow]);

  const handleExitComplete = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
      document.documentElement.classList.add("preloader-done");
    } catch {
      // sessionStorage safety
    }
    setIsUnmounted(true);
  };

  // Do not render anything if already visited in this session or unmounted
  if (!shouldShow || isUnmounted) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isUnmounted && (
        <motion.div
          id="preloader-curtain"
          className="preloader-overlay"
          initial={{ y: 0 }}
          animate={
            isExiting
              ? prefersReducedMotion
                ? { opacity: 0 }
                : { y: "-100%" }
              : { y: 0, opacity: 1 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.45 : 0.85,
            ease: [0.76, 0, 0.24, 1], // Smooth exponential wipe
            delay: prefersReducedMotion ? 0 : 0.18,
          }}
          onAnimationComplete={() => {
            if (isExiting) {
              handleExitComplete();
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "#F0EFEA", // Real website warm cream theme (NOT black)
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible", // Removed overflow clipping as requested
            pointerEvents: isExiting ? "none" : "auto",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          {/* Subtle noise texture layer matching site aesthetic */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.035,
              backgroundImage:
                "radial-gradient(#37481A 1px, transparent 0)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />

          {/* Central Container: Handwritten Signature + Subtle Progress */}
          <motion.div
            className="preloader-content"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={
              isExiting
                ? {
                    opacity: 0,
                    scale: 0.94,
                    y: prefersReducedMotion ? 0 : -24,
                  }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "100vw",
              padding: "1.5rem 1rem",
              boxSizing: "border-box",
              textAlign: "center",
              overflow: "visible",
            }}
          >
            {/* Signature Component: "Sadia Aqeel" drawn smoothly with zero clipping */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "min(560px, 86vw)",
                marginBottom: "0.5rem",
                overflow: "visible",
              }}
            >
              <Signature
                text="Sadia Aqeel"
                color="#37481A"
                fontSize={64}
                duration={1.35}
                delay={0.15}
                fontUrl="/LastoriaBoldRegular.otf"
              />
            </div>

            {/* Soft, Curved, Refined Loading Line (Non-handwritten, Uncluttered) */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{
                fontFamily: "'Satoshi', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
                fontWeight: 500,
                color: "#37481A",
                letterSpacing: "0.08em",
                marginBottom: "1.35rem",
                marginTop: "0.25rem",
                opacity: 0.82,
                userSelect: "none",
                textAlign: "center",
                whiteSpace: "nowrap",
                maxWidth: "min(400px, 88vw)",
                overflow: "visible",
              }}
            >
              Loading Graphics Heaven
            </motion.div>

            {/* Subtle Progress Area: Thin Line + Percentage */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.55rem",
                width: "min(220px, 68vw)",
                maxWidth: "100%",
                overflow: "visible",
              }}
            >
              {/* Thin Hairline Progress Bar */}
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "rgba(55, 72, 26, 0.12)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: "#759D42", // Vibrant accent moss green
                    borderRadius: "9999px",
                    transformOrigin: "left",
                    scaleX: progress / 100,
                  }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>

              {/* Progress Percentage */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  fontFamily: "'Instrument Sans', -apple-system, sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  color: "#37481A",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
