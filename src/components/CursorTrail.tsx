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
    const maxPoints = 20; // Reduced for shorter, cleaner trail

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
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    // Initialize points with distinct objects
    pointsRef.current = Array.from({ length: maxPoints }, () => ({ 
      x: mouseRef.current.x, 
      y: mouseRef.current.y 
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Follow the mouse directly
      let tempPoints = [...pointsRef.current];
      let head = tempPoints[0];
      
      head.x = mouseRef.current.x;
      head.y = mouseRef.current.y;

      // Update the rest of the body for a liquid trail
      for (let i = 1; i < maxPoints; i++) {
        const prev = tempPoints[i - 1];
        const curr = tempPoints[i];
        curr.x += (prev.x - curr.x) * 0.4;
        curr.y += (prev.y - curr.y) * 0.4;
      }

      pointsRef.current = tempPoints;

      if (tempPoints.length > 2) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "screen";

          // Subtle gradient from head to tail
          const gradient = ctx.createLinearGradient(
            tempPoints[0].x, tempPoints[0].y,
            tempPoints[tempPoints.length - 1].x, tempPoints[tempPoints.length - 1].y
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
          gradient.addColorStop(0.1, "rgba(0, 163, 255, 0.5)");
          gradient.addColorStop(0.5, "rgba(0, 163, 255, 0.2)");
          gradient.addColorStop(1, "rgba(0, 163, 255, 0)");

          ctx.strokeStyle = gradient;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0, 163, 255, 0.4)";

          // Draw smooth path using quadratic curves
          ctx.moveTo(tempPoints[0].x, tempPoints[0].y);
          
          for (let i = 1; i < tempPoints.length - 2; i++) {
            const xc = (tempPoints[i].x + tempPoints[i + 1].x) / 2;
            const yc = (tempPoints[i].y + tempPoints[i + 1].y) / 2;
            
            // Tapered width starting smaller
            ctx.lineWidth = Math.max(0.5, 6 * (1 - i / maxPoints));
            ctx.quadraticCurveTo(tempPoints[i].x, tempPoints[i].y, xc, yc);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(xc, yc);
          }

        // Final segments
        ctx.quadraticCurveTo(
          tempPoints[tempPoints.length - 2].x,
          tempPoints[tempPoints.length - 2].y,
          tempPoints[tempPoints.length - 1].x,
          tempPoints[tempPoints.length - 1].y
        );
        ctx.stroke();
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
