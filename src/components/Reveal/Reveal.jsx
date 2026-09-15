import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reusable viewport scroll-reveal.
 * Uses Intersection Observer + opacity/transform only.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 550,
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  style,
  ...rest
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

  const classes = [
    "reveal",
    `reveal--${variant}`,
    visible ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-duration": `${duration}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
