import { useState, useEffect, useRef } from "react";
import "./PreLoader.css";

const LOAD_MS = 2400;
const HOLD_MS = 350;
const FADE_MS = 550;

/** Gentle ease-in-out so 0→100 advances steadily without harsh jumps */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const PreLoader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    let hideTimer;
    let holdTimer;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / LOAD_MS, 1);
      const next = Math.min(100, Math.floor(easeInOutCubic(t) * 100 + 1e-6));
      setProgress((prev) => (next > prev ? next : prev));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      holdTimer = setTimeout(() => {
        setFadeOut(true);
        hideTimer = setTimeout(() => setVisible(false), FADE_MS);
      }, HOLD_MS);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(holdTimer);
      clearTimeout(hideTimer);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (visible) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#040508] transition-opacity ease-out ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      role="status"
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label={`Loading ${progress}%`}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-7">
        <div className="text-[#A78BFA]" aria-hidden="true">
          <div className="lds-spinner">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} />
            ))}
          </div>
        </div>

        <p className="font-display min-w-[4.5ch] text-center text-sm font-medium tracking-[0.14em] text-white/80 tabular-nums sm:text-base">
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default PreLoader;
