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
  const maxPoints = 25; // Number of segments in the fluid trail

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    // Initialize points
    pointsRef.current = Array(maxPoints).fill({ x: mouseRef.current.x, y: mouseRef.current.y });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Follow the mouse with smoothing
      let tempPoints = [...pointsRef.current];
      let head = tempPoints[0];
      
      // Update head towards mouse
      head.x += (mouseRef.current.x - head.x) * 0.45;
      head.y += (mouseRef.current.y - head.y) * 0.45;

      // Update the rest of the body to follow the head
      for (let i = 1; i < maxPoints; i++) {
        const prev = tempPoints[i - 1];
        const curr = tempPoints[i];
        curr.x += (prev.x - curr.x) * 0.35;
        curr.y += (prev.y - curr.y) * 0.35;
      }

      pointsRef.current = tempPoints;

      if (tempPoints.length > 2) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "screen";

        // Create fluid gradient from head to tail
        const gradient = ctx.createLinearGradient(
          tempPoints[0].x, tempPoints[0].y,
          tempPoints[maxPoints - 1].x, tempPoints[maxPoints - 1].y
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.2, "rgba(0, 204, 255, 0.6)");
        gradient.addColorStop(1, "rgba(0, 204, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0, 204, 255, 0.4)";

        // Draw smooth path using quadratic curves
        ctx.moveTo(tempPoints[0].x, tempPoints[0].y);
        
        for (let i = 1; i < tempPoints.length - 2; i++) {
          const xc = (tempPoints[i].x + tempPoints[i + 1].x) / 2;
          const yc = (tempPoints[i].y + tempPoints[i + 1].y) / 2;
          
          // Gradually decrease line width for tapering effect
          ctx.lineWidth = Math.max(0.5, 8 * (1 - i / maxPoints));
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
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
    />
  );
}
