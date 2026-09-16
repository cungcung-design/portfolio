import { useEffect } from "react";
import { FiX } from "react-icons/fi";

/**
 * Shared glassmorphism modal shell: Escape, backdrop click, body scroll lock.
 */
export default function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  labelledBy = "glass-modal-title",
  panelClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 p-4 backdrop-blur-md sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
        className={`my-auto w-full max-w-md max-h-[min(92dvh,720px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[rgba(18,18,24,0.72)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-6 animate-glass-in ${panelClassName}`}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 id={labelledBy} className="font-display text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <FiX size={18} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
      <style>{`
        @keyframes glassIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-glass-in {
          animation: glassIn 0.22s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-glass-in { animation: none; }
        }
      `}</style>
    </div>
  );
}
