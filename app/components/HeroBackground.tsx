"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  isAccent: boolean;
  radius: number;
  targetRadius: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 15 : 60;
    const connectionDistance = isMobile ? 100 : 180;
    const mouseRadius = 150;
    const mobileOpacityMultiplier = isMobile ? 0.2 : 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        const isAccent = i < 8;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          isAccent,
          radius: isAccent ? 3 : 2,
          targetRadius: isAccent ? 3 : 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < mouseRadius && distToMouse > 0) {
          const force = (mouseRadius - distToMouse) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          node.vx = node.baseVx - Math.cos(angle) * force * 0.8;
          node.vy = node.baseVy - Math.sin(angle) * force * 0.8;
          node.targetRadius = node.isAccent ? 6 : 4;
        } else {
          node.vx += (node.baseVx - node.vx) * 0.05;
          node.vy += (node.baseVy - node.vy) * 0.05;
          node.targetRadius = node.isAccent ? 3 : 2;
        }

        node.radius += (node.targetRadius - node.radius) * 0.1;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.baseVx *= -1;
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.baseVy *= -1;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const distToMouse = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            );

            let opacity = (1 - distance / connectionDistance) * 0.25 * mobileOpacityMultiplier;
            const isAccentLine = nodes[i].isAccent || nodes[j].isAccent;

            if (distToMouse < mouseRadius) {
              const boost = (1 - distToMouse / mouseRadius) * 0.5;
              opacity += boost;
            }

            ctx.beginPath();
            if (isAccentLine || distToMouse < mouseRadius * 0.5) {
              ctx.strokeStyle = `rgba(220, 38, 38, ${Math.min(opacity * 0.8, 0.7 * mobileOpacityMultiplier)})`;
              ctx.lineWidth = distToMouse < mouseRadius * 0.5 ? 1.5 : 1;
            } else {
              ctx.strokeStyle = `rgba(15, 23, 42, ${Math.min(opacity, 0.5 * mobileOpacityMultiplier)})`;
              ctx.lineWidth = 1;
            }
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distToMouse < mouseRadius;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isAccent) {
          ctx.fillStyle = isNearMouse
            ? `rgba(220, 38, 38, ${0.9 * mobileOpacityMultiplier})`
            : `rgba(220, 38, 38, ${0.5 * mobileOpacityMultiplier})`;
        } else if (isNearMouse) {
          ctx.fillStyle = `rgba(220, 38, 38, ${0.6 * mobileOpacityMultiplier})`;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${0.35 * mobileOpacityMultiplier})`;
        }
        ctx.fill();

        if (isNearMouse && distToMouse < mouseRadius * 0.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220, 38, 38, ${0.3 * (1 - distToMouse / mouseRadius)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initNodes();
    animate();

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </motion.div>
  );
}

