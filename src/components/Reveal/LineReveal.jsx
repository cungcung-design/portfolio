import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-triggered line-by-line reveal.
 * Each child line fades/slides up in sequence.
 */
export default function LineReveal({
  lines = [],
  className = "",
  lineClassName = "",
  as: Tag = "div",
  lineAs: LineTag = "p",
  delay = 0,
  stagger = 120,
  duration = 520,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        if (once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, once, threshold, rootMargin]);

  return (
    <Tag
      ref={ref}
      className={`line-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{
        "--line-duration": `${duration}ms`,
        "--line-base-delay": `${delay}ms`,
        "--line-stagger": `${stagger}ms`,
      }}
    >
      {lines.map((line, index) => (
        <LineTag
          key={index}
          className={`line-reveal__line ${lineClassName}`.trim()}
          style={{ "--line-index": index }}
        >
          {line}
        </LineTag>
      ))}
    </Tag>
  );
}
