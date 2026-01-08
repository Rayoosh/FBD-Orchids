"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const lastMouseMoveRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);
  const maxPoints = 10; // Reduced for performance
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveRef.current = Date.now();
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleResize();

    pointsRef.current = Array.from({ length: maxPoints }, () => ({ 
      x: mouseRef.current.x, 
      y: mouseRef.current.y 
    }));

    let animationFrameId: number;

    const render = () => {
      if (!isActiveRef.current) return;

      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveRef.current;
      
      // If no movement for 2 seconds and points have converged, stop rendering
      let hasSignificantMovement = false;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let tempPoints = [...pointsRef.current];
      let head = tempPoints[0];
      
      // Update head
      head.x = mouseRef.current.x;
      head.y = mouseRef.current.y;

      // Update body
      for (let i = 1; i < maxPoints; i++) {
        const prev = tempPoints[i - 1];
        const curr = tempPoints[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          hasSignificantMovement = true;
        }
        
        curr.x += dx * 0.35;
        curr.y += dy * 0.35;
      }

      pointsRef.current = tempPoints;

      if (tempPoints.length > 2) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "screen";

        // Glow trail (simplified)
        ctx.strokeStyle = "rgba(0, 163, 255, 0.1)";
        ctx.moveTo(tempPoints[0].x, tempPoints[0].y);
        for (let i = 1; i < tempPoints.length - 1; i++) {
          const xc = (tempPoints[i].x + tempPoints[i + 1].x) / 2;
          const yc = (tempPoints[i].y + tempPoints[i + 1].y) / 2;
          ctx.lineWidth = Math.max(1, 8 * (1 - i / maxPoints));
          ctx.quadraticCurveTo(tempPoints[i].x, tempPoints[i].y, xc, yc);
        }
        ctx.stroke();

        // Sharp trail
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          tempPoints[0].x, tempPoints[0].y,
          tempPoints[tempPoints.length - 1].x, tempPoints[tempPoints.length - 1].y
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        gradient.addColorStop(0.3, "rgba(0, 163, 255, 0.5)");
        gradient.addColorStop(1, "rgba(0, 163, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.moveTo(tempPoints[0].x, tempPoints[0].y);
        
        for (let i = 1; i < tempPoints.length - 1; i++) {
          const xc = (tempPoints[i].x + tempPoints[i + 1].x) / 2;
          const yc = (tempPoints[i].y + tempPoints[i + 1].y) / 2;
          ctx.lineWidth = Math.max(0.5, 4 * (1 - i / maxPoints));
          ctx.quadraticCurveTo(tempPoints[i].x, tempPoints[i].y, xc, yc);
        }
        ctx.stroke();
      }

      if (timeSinceLastMove > 2000 && !hasSignificantMovement) {
        isActiveRef.current = false;
        cancelAnimationFrame(animationFrameId);
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998] h-full w-full"
    />
  );
}
