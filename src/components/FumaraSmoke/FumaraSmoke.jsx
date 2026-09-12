import { useEffect, useRef } from "react";

const COLOR_SMOKE = "#8fa3bb";
const COLOR_GLOW = "#38485e";
const COLOR_BG = "#040508";
const RENDER_SCALE = 0.5;

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

function createSmokeSprite() {
  const size = 256;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, hexToRgba(COLOR_SMOKE, 1));
  gradient.addColorStop(0.4, hexToRgba(COLOR_GLOW, 0.6));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export default function FumaraSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particles = [];
    let rafId = 0;
    let idleId = 0;
    let cancelled = false;
    let running = false;
    let bgGradient = null;
    const sprite = createSmokeSprite();

    const particleCount = window.innerWidth < 768 ? 10 : 18;

    const createParticle = () => {
      const radius = randomBetween(120, 280);
      return {
        x: randomBetween(-50, canvas.width + 50),
        y: randomBetween(canvas.height * 0.4, canvas.height + radius),
        radius,
        dx: randomBetween(-0.2, 0.2),
        dy: randomBetween(-0.4, -0.1),
        alpha: randomBetween(0.08, 0.22),
        driftSpeed: randomBetween(0.005, 0.015),
        angle: randomBetween(0, Math.PI * 2),
      };
    };

    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.max(1, Math.floor(width * RENDER_SCALE));
      canvas.height = Math.max(1, Math.floor(height * RENDER_SCALE));
      bgGradient = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.7,
        50,
        canvas.width * 0.4,
        canvas.height * 0.6,
        canvas.width * 1.1
      );
      bgGradient.addColorStop(0, "rgba(30, 41, 59, 0.35)");
      bgGradient.addColorStop(0.5, "rgba(11, 15, 25, 0.2)");
      bgGradient.addColorStop(1, "rgba(4, 5, 8, 1)");
    };

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, createParticle);
    };

    const drawBackground = () => {
      ctx.fillStyle = COLOR_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (bgGradient) {
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const renderSmoke = () => {
      if (cancelled || document.hidden) {
        running = false;
        return;
      }

      drawBackground();

      particles.forEach((p) => {
        p.angle += p.driftSpeed;
        p.x += p.dx + Math.sin(p.angle) * 0.8;
        p.y += p.dy;

        if (p.y + p.radius < 0) {
          p.y = canvas.height + p.radius;
          p.x = randomBetween(-50, canvas.width + 50);
        }

        ctx.globalAlpha = p.alpha;
        ctx.drawImage(
          sprite,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        );
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(renderSmoke);
    };

    const start = () => {
      if (cancelled || running) return;
      running = true;
      setCanvasSize();
      initParticles();
      rafId = requestAnimationFrame(renderSmoke);
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        running = false;
        return;
      }
      start();
    };

    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 180));
    idleId = schedule(start, { timeout: 400 });

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(rafId);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040508]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
