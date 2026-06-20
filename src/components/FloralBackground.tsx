import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  rot: number;
  rspd: number;
  phase: number;
  pspd: number;
  sway: number;
  type: number; // 0 = Sakura, 1 = Rose, 2 = Tulip/Soft Tapered
}

const COLORS = [
  'rgba(182, 139, 78, ',   // Deep Gold/Caramel
  'rgba(169, 124, 80, ',   // Warm Brown
  'rgba(206, 173, 139, ',  // Light Caramel
  'rgba(220, 207, 184, ',  // Muted Cream Caramel
  'rgba(232, 196, 140, ',  // Honey Caramel
];

const SKY_COLORS = [
  'rgba(14, 116, 144, ',   // Cyan Blue
  'rgba(56, 189, 248, ',   // Sky Blue
  'rgba(186, 230, 253, ',  // Soft Blue
  'rgba(224, 242, 254, ',  // Alice/Ice Blue
  'rgba(3, 105, 161, ',    // Deep Cyan
];

interface FloralBackgroundProps {
  theme?: 'cream' | 'skyblue';
}

export default function FloralBackground({ theme = 'cream' }: FloralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const currentColors = theme === 'skyblue' ? SKY_COLORS : COLORS;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const createPetal = (isNew = false): Petal => {
      const color = currentColors[Math.floor(Math.random() * currentColors.length)];
      return {
        x: Math.random() * width,
        y: isNew ? -20 : Math.random() * height,
        size: Math.random() * 5 + 3, // 3px to 8px
        color,
        alpha: Math.random() * 0.35 + 0.15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.45 + 0.15,
        rot: Math.random() * Math.PI * 2,
        rspd: (Math.random() - 0.5) * 0.012,
        phase: Math.random() * Math.PI * 2,
        pspd: Math.random() * 0.008 + 0.002,
        sway: Math.random() * 0.5 + 0.15,
        type: Math.floor(Math.random() * 3),
      };
    };

    const init = () => {
      const count = Math.min(Math.floor((width * height) / 18000), 55); // limit active particles
      petals = Array.from({ length: count }, () => createPetal(false));
    };

    const drawPetal = (p: Petal) => {
      const alpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;

      const sz = p.size;
      ctx.beginPath();

      if (p.type === 0) {
        // Sakura teardrop shape
        ctx.moveTo(0, -sz);
        ctx.bezierCurveTo(sz * 0.8, -sz * 0.8, sz * 0.9, sz * 0.3, 0, sz * 0.55);
        ctx.bezierCurveTo(-sz * 0.9, sz * 0.3, -sz * 0.8, -sz * 0.8, 0, -sz);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();

        // Delicate center vein
        ctx.globalAlpha = alpha * 0.3;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = sz * 0.06;
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.7);
        ctx.lineTo(0, sz * 0.4);
        ctx.stroke();
      } else if (p.type === 1) {
        // Red Rose Petal - Elliptical with slight fold
        ctx.ellipse(0, 0, sz * 0.45, sz, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();

        // Shimmer highlight
        ctx.globalAlpha = alpha * 0.25;
        ctx.beginPath();
        ctx.ellipse(-sz * 0.1, -sz * 0.25, sz * 0.12, sz * 0.3, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        // Tulip petal - narrow, tapered oval
        ctx.ellipse(0, 0, sz * 0.35, sz * 0.85, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p, idx) => {
        p.phase += p.pspd;
        p.rot += p.rspd;
        p.x += p.vx + Math.sin(p.phase) * p.sway;
        p.y += p.vy;

        // Reset if goes off borders
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          petals[idx] = createPetal(true);
        } else {
          drawPetal(p);
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    init();
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      id="falling-petals-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-1"
      style={{ opacity: 0.9 }}
    />
  );
}
