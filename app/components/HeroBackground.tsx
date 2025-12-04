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
  glowIntensity: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 18 : 65;
    const connectionDistance = isMobile ? 110 : 200;
    const mouseRadius = 180;
    const mobileOpacityMultiplier = isMobile ? 0.5 : 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const vx = (Math.random() - 0.5) * 0.35;
        const vy = (Math.random() - 0.5) * 0.35;
        const isAccent = i < 10;
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
          glowIntensity: 0,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current = { x: -1000, y: -1000, active: false };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && distToMouse < mouseRadius && distToMouse > 0) {
          const force = (mouseRadius - distToMouse) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          node.vx = node.baseVx - Math.cos(angle) * force * 0.6;
          node.vy = node.baseVy - Math.sin(angle) * force * 0.6;
          node.targetRadius = node.isAccent ? 5 : 3.5;
          node.glowIntensity += (1 - node.glowIntensity) * 0.15;
        } else {
          node.vx += (node.baseVx - node.vx) * 0.03;
          node.vy += (node.baseVy - node.vy) * 0.03;
          node.targetRadius = node.isAccent ? 3 : 2;
          node.glowIntensity += (0 - node.glowIntensity) * 0.08;
        }

        node.radius += (node.targetRadius - node.radius) * 0.12;

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

            let opacity = (1 - distance / connectionDistance) * 0.2 * mobileOpacityMultiplier;
            const isAccentLine = nodes[i].isAccent || nodes[j].isAccent;
            const nodeGlow = Math.max(nodes[i].glowIntensity, nodes[j].glowIntensity);

            if (mouse.active && distToMouse < mouseRadius) {
              const boost = (1 - distToMouse / mouseRadius) * 0.4;
              opacity += boost;
            }

            ctx.beginPath();
            if (isAccentLine || (mouse.active && distToMouse < mouseRadius * 0.7)) {
              const lineOpacity = Math.min(opacity * 0.9 + nodeGlow * 0.3, 0.65 * mobileOpacityMultiplier);
              ctx.strokeStyle = `rgba(220, 38, 38, ${lineOpacity})`;
              ctx.lineWidth = mouse.active && distToMouse < mouseRadius * 0.5 ? 1.2 : 0.8;
            } else {
              ctx.strokeStyle = `rgba(15, 23, 42, ${Math.min(opacity, 0.4 * mobileOpacityMultiplier)})`;
              ctx.lineWidth = 0.8;
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
        const isNearMouse = mouse.active && distToMouse < mouseRadius;
        const proximity = isNearMouse ? 1 - distToMouse / mouseRadius : 0;

        if (node.glowIntensity > 0.05) {
          const glowRadius = node.radius + 6 + node.glowIntensity * 4;
          const gradient = ctx.createRadialGradient(
            node.x, node.y, node.radius,
            node.x, node.y, glowRadius
          );
          gradient.addColorStop(0, `rgba(220, 38, 38, ${node.glowIntensity * 0.25 * mobileOpacityMultiplier})`);
          gradient.addColorStop(1, "rgba(220, 38, 38, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isAccent) {
          const accentOpacity = 0.5 + proximity * 0.4 + node.glowIntensity * 0.1;
          ctx.fillStyle = `rgba(220, 38, 38, ${accentOpacity * mobileOpacityMultiplier})`;
        } else if (isNearMouse || node.glowIntensity > 0.1) {
          const nodeOpacity = 0.3 + proximity * 0.5 + node.glowIntensity * 0.2;
          ctx.fillStyle = `rgba(220, 38, 38, ${nodeOpacity * mobileOpacityMultiplier})`;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${0.3 * mobileOpacityMultiplier})`;
        }
        ctx.fill();

        if (isNearMouse && proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 2 + proximity * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220, 38, 38, ${proximity * 0.25 * mobileOpacityMultiplier})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initNodes();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
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
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
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

