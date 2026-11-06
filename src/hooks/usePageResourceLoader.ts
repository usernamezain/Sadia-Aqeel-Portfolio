import { useState, useEffect, useRef } from "react";

export interface ResourceLoaderState {
  /** Smoothed progress percentage from 0 to 100 */
  progress: number;
  /** Whether all resources are loaded and minimum display time has passed */
  isComplete: boolean;
  /** Whether the preloader should be displayed (false if already seen this session) */
  shouldShow: boolean;
}

interface UsePageResourceLoaderOptions {
  /** Minimum time to display the preloader so the signature finishes drawing (in ms) */
  minDisplayTime?: number;
  /** Maximum time before forcing completion even if some assets hang (in ms) */
  safetyTimeout?: number;
}

const SESSION_KEY = "hasSeenPreloader";

export function usePageResourceLoader({
  minDisplayTime = 3200,
  safetyTimeout = 8500,
}: UsePageResourceLoaderOptions = {}): ResourceLoaderState {
  // Check session storage synchronously on initial render if in browser
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "true";
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState<number>(shouldShow ? 0 : 100);
  const [isComplete, setIsComplete] = useState<boolean>(!shouldShow);

  const rawProgressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const rafIdRef = useRef<number>(0);
  const completedRef = useRef<boolean>(!shouldShow);

  useEffect(() => {
    if (!shouldShow) {
      setIsComplete(true);
      setProgress(100);
      return;
    }

    startTimeRef.current = Date.now();
    completedRef.current = false;

    // ─── 1. Lock document scrolling while preloader is active ─────
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const unlockScroll = () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };

    // ─── 2. Track Real Resource Loading ─────────────────────────
    const tracker = {
      fonts: false,
      windowLoad: document.readyState === "complete",
      criticalImagesTotal: 0,
      criticalImagesLoaded: 0,
      videosTotal: 0,
      videosLoaded: 0,
      fontAsset: false,
    };

    function updateRawProgress() {
      if (completedRef.current) return;

      // Calculate weighted score across real assets
      let score = 0;
      let totalWeight = 0;

      // A. Document Fonts (Weight: 20)
      totalWeight += 20;
      if (tracker.fonts) score += 20;

      // B. Document / Window Load (Weight: 30)
      totalWeight += 30;
      if (tracker.windowLoad) score += 30;

      // C. Lastoria Signature Font Asset (Weight: 20)
      totalWeight += 20;
      if (tracker.fontAsset) score += 20;

      // D. Critical Above-the-fold Images (Weight: 20)
      totalWeight += 20;
      if (tracker.criticalImagesTotal > 0) {
        score += (tracker.criticalImagesLoaded / tracker.criticalImagesTotal) * 20;
      } else {
        score += 20; // none found
      }

      // E. Media / Videos (Weight: 10)
      totalWeight += 10;
      if (tracker.videosTotal > 0) {
        score += (tracker.videosLoaded / tracker.videosTotal) * 10;
      } else {
        score += 10; // none found
      }

      const calculated = Math.min(99, Math.round((score / totalWeight) * 100));
      rawProgressRef.current = Math.max(rawProgressRef.current, calculated);
    }

    // A. Track document fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        tracker.fonts = true;
        updateRawProgress();
      }).catch(() => {
        tracker.fonts = true;
        updateRawProgress();
      });
    } else {
      tracker.fonts = true;
    }

    // B. Track window load event
    if (document.readyState === "complete") {
      tracker.windowLoad = true;
      updateRawProgress();
    } else {
      const handleWindowLoad = () => {
        tracker.windowLoad = true;
        updateRawProgress();
      };
      window.addEventListener("load", handleWindowLoad, { once: true });
    }

    // C. Preload Signature OTF Font directly
    fetch("/LastoriaBoldRegular.otf")
      .then((res) => {
        if (res.ok) {
          tracker.fontAsset = true;
          updateRawProgress();
        }
      })
      .catch(() => {
        tracker.fontAsset = true;
        updateRawProgress();
      });

    // D. Track above-the-fold images
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    const criticalImages = images.filter((img) => {
      // Prioritize hero/nav images or images high on the viewport
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < (window.innerHeight || 900) * 1.5;
      const isEager = img.loading !== "lazy" || img.getAttribute("data-priority") === "high";
      return isAboveFold || isEager;
    });

    tracker.criticalImagesTotal = criticalImages.length;
    criticalImages.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        tracker.criticalImagesLoaded++;
        updateRawProgress();
      } else {
        const onDone = () => {
          tracker.criticalImagesLoaded++;
          updateRawProgress();
        };
        img.addEventListener("load", onDone, { once: true });
        img.addEventListener("error", onDone, { once: true });
        if (img.decode) {
          img.decode().then(onDone).catch(onDone);
        }
      }
    });

    // E. Track videos if any
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video"));
    tracker.videosTotal = videos.length;
    videos.forEach((vid) => {
      if (vid.readyState >= 3) {
        tracker.videosLoaded++;
        updateRawProgress();
      } else {
        const onCanPlay = () => {
          tracker.videosLoaded++;
          updateRawProgress();
        };
        vid.addEventListener("canplaythrough", onCanPlay, { once: true });
        vid.addEventListener("error", onCanPlay, { once: true });
      }
    });

    updateRawProgress();

    // ─── 3. Smooth Lerp Animation Loop & Minimum Time Gate ────────
    let currentDisplayProgress = 0;

    function renderLoop() {
      const elapsed = Date.now() - startTimeRef.current;
      const allAssetsReady =
        tracker.fonts &&
        tracker.windowLoad &&
        tracker.fontAsset &&
        (tracker.criticalImagesTotal === 0 || tracker.criticalImagesLoaded >= tracker.criticalImagesTotal) &&
        (tracker.videosTotal === 0 || tracker.videosLoaded >= tracker.videosTotal);

      const hasReachedMinTime = elapsed >= minDisplayTime;
      const hasHitSafetyTimeout = elapsed >= safetyTimeout;

      // Target progress determination
      let targetProgress = rawProgressRef.current;

      // Time pacing: ensure progress advances smoothly to accompany calligraphy
      const timeRatio = Math.min(1, elapsed / minDisplayTime);
      const timePacedProgress = Math.round(timeRatio * 95);
      targetProgress = Math.max(targetProgress, timePacedProgress);

      if ((allAssetsReady && hasReachedMinTime) || hasHitSafetyTimeout) {
        targetProgress = 100;
      }

      // Smooth lerp towards target
      const delta = targetProgress - currentDisplayProgress;
      const step = targetProgress === 100 ? 0.15 : 0.08;
      currentDisplayProgress += delta * step;

      // Snap near completion
      if (targetProgress === 100 && currentDisplayProgress >= 99.5) {
        currentDisplayProgress = 100;
        setProgress(100);
        completedRef.current = true;
        setIsComplete(true);
        unlockScroll();
        return;
      }

      setProgress(Math.round(currentDisplayProgress));
      rafIdRef.current = requestAnimationFrame(renderLoop);
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);

    // ─── 4. Safety Timeout Fallback ──────────────────────────────
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setProgress(100);
        setIsComplete(true);
        unlockScroll();
      }
    }, safetyTimeout);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(safetyTimer);
      unlockScroll();
    };
  }, [minDisplayTime, safetyTimeout, shouldShow]);

  return {
    progress,
    isComplete,
    shouldShow,
  };
}

export default usePageResourceLoader;
