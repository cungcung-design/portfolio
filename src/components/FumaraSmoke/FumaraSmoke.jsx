import { useEffect, useRef } from "react";

const COLOR_SMOKE = "#8fa3bb";
const COLOR_GLOW = "#38485e";
const COLOR_BG = "#040508";

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FumaraSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    let rafId = 0;
    let cancelled = false;

    const createParticle = () => {
      const radius = randomBetween(130, 340);
      return {
        x: randomBetween(-80, canvas.width + 80),
        y: randomBetween(canvas.height * 0.3, canvas.height + radius),
        radius,
        dx: randomBetween(-0.25, 0.25),
        dy: randomBetween(-0.45, -0.12),
        alpha: randomBetween(0.12, 0.28),
        driftSpeed: randomBetween(0.005, 0.015),
        angle: randomBetween(0, Math.PI * 2),
      };
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: 75 }, createParticle);
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.7,
        50,
        canvas.width * 0.4,
        canvas.height * 0.6,
        canvas.width * 1.1
      );

      bg.addColorStop(0, "rgba(30, 41, 59, 0.4)");
      bg.addColorStop(0.5, "rgba(11, 15, 25, 0.25)");
      bg.addColorStop(1, "rgba(4, 5, 8, 1)");

      ctx.fillStyle = COLOR_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const renderSmoke = () => {
      if (cancelled) return;

      drawBackground();

      particles.forEach((p) => {
        p.angle += p.driftSpeed;
        p.x += p.dx + Math.sin(p.angle) * 0.8;
        p.y += p.dy;

        if (p.y + p.radius < 0) {
          p.y = canvas.height + p.radius;
          p.x = randomBetween(-80, canvas.width + 80);
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, hexToRgba(COLOR_SMOKE, p.alpha));
        gradient.addColorStop(0.4, hexToRgba(COLOR_GLOW, p.alpha * 0.6));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(renderSmoke);
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    setCanvasSize();
    initParticles();
    rafId = requestAnimationFrame(renderSmoke);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040508]"
      aria-label="Smoke effect background"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
