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
  type: "waypoint" | "hub";
  scale: number;
  targetScale: number;
  glowIntensity: number;
}

interface Parcel {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  active: boolean;
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
    let parcels: Parcel[] = [];

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 14 : 40;
    const hubCount = isMobile ? 3 : 7;
    const connectionDistance = isMobile ? 130 : 200;
    const mouseRadius = 150;
    const mobileOpacityMultiplier = isMobile ? 0.6 : 1;
    const parcelCount = isMobile ? 3 : 8;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = [];
      parcels = [];

      for (let i = 0; i < nodeCount; i++) {
        const vx = (Math.random() - 0.5) * 0.2;
        const vy = (Math.random() - 0.5) * 0.2;
        const isHub = i < hubCount;

        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          type: isHub ? "hub" : "waypoint",
          scale: 1,
          targetScale: 1,
          glowIntensity: 0,
        });
      }

      for (let i = 0; i < parcelCount; i++) {
        parcels.push({
          startNode: 0,
          endNode: 1,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.0015,
          active: false,
        });
      }
    };

    const findConnection = (): [number, number] | null => {
      const validConnections: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance && distance > 50) {
            validConnections.push([i, j]);
          }
        }
      }

      if (validConnections.length === 0) return null;
      return validConnections[Math.floor(Math.random() * validConnections.length)];
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

    const drawLocationPin = (x: number, y: number, scale: number, opacity: number) => {
      const size = 8 * scale;
      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.moveTo(0, size);
      ctx.bezierCurveTo(-size * 0.7, size * 0.3, -size * 0.7, -size * 0.5, 0, -size * 0.5);
      ctx.bezierCurveTo(size * 0.7, -size * 0.5, size * 0.7, size * 0.3, 0, size);
      ctx.closePath();

      ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.fill();

      ctx.restore();
    };

    const drawPackage = (x: number, y: number, opacity: number, rotation: number = 0) => {
      const size = 6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(size / 2, 0);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(0, size / 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawWaypoint = (x: number, y: number, scale: number, opacity: number) => {
      const radius = 3 * scale;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.5})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.8})`;
      ctx.fill();
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      opacity: number,
      isAccent: boolean
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      if (isAccent) {
        ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`;
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = `rgba(15, 23, 42, ${opacity})`;
        ctx.lineWidth = 0.75;
      }
      ctx.stroke();
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
          node.vx = node.baseVx - Math.cos(angle) * force * 0.4;
          node.vy = node.baseVy - Math.sin(angle) * force * 0.4;
          node.targetScale = 1.3;
          node.glowIntensity += (1 - node.glowIntensity) * 0.1;
        } else {
          node.vx += (node.baseVx - node.vx) * 0.03;
          node.vy += (node.baseVy - node.vy) * 0.03;
          node.targetScale = 1;
          node.glowIntensity += (0 - node.glowIntensity) * 0.05;
        }

        node.scale += (node.targetScale - node.scale) * 0.1;

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

            const isHubConnection = nodes[i].type === "hub" || nodes[j].type === "hub";
            const nodeGlow = Math.max(nodes[i].glowIntensity, nodes[j].glowIntensity);

            const baseOpacity = isHubConnection ? 0.18 : 0.08;
            let opacity = (1 - distance / connectionDistance) * baseOpacity * mobileOpacityMultiplier;

            if (mouse.active && distToMouse < mouseRadius) {
              const boost = (1 - distToMouse / mouseRadius) * 0.12;
              opacity += boost;
            }

            const lineOpacity = Math.min(opacity + nodeGlow * 0.1, 0.35 * mobileOpacityMultiplier);
            drawLine(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y,
              lineOpacity,
              isHubConnection
            );
          }
        }
      }

      parcels.forEach((parcel) => {
        if (!parcel.active) {
          const connection = findConnection();
          if (connection) {
            parcel.startNode = connection[0];
            parcel.endNode = connection[1];
            parcel.progress = 0;
            parcel.active = true;
          }
          return;
        }

        parcel.progress += parcel.speed;

        if (parcel.progress >= 1) {
          parcel.active = false;
          return;
        }

        const startNode = nodes[parcel.startNode];
        const endNode = nodes[parcel.endNode];

        if (!startNode || !endNode) {
          parcel.active = false;
          return;
        }

        const x = startNode.x + (endNode.x - startNode.x) * parcel.progress;
        const y = startNode.y + (endNode.y - startNode.y) * parcel.progress;

        const angle = Math.atan2(
          endNode.y - startNode.y,
          endNode.x - startNode.x
        );

        const fadeIn = Math.min(parcel.progress * 4, 1);
        const fadeOut = Math.min((1 - parcel.progress) * 4, 1);
        const opacity = fadeIn * fadeOut * 0.85 * mobileOpacityMultiplier;

        drawPackage(x, y, opacity, angle);
      });

      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = mouse.active && distToMouse < mouseRadius;
        const proximity = isNearMouse ? 1 - distToMouse / mouseRadius : 0;

        if (node.glowIntensity > 0.05) {
          const glowRadius = 12 + node.glowIntensity * 8;
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(220, 38, 38, ${node.glowIntensity * 0.15 * mobileOpacityMultiplier})`);
          gradient.addColorStop(1, "rgba(220, 38, 38, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        if (node.type === "hub") {
          const pinOpacity = (0.6 + proximity * 0.3 + node.glowIntensity * 0.1) * mobileOpacityMultiplier;
          drawLocationPin(node.x, node.y, node.scale, pinOpacity);
        } else {
          const waypointOpacity = (0.5 + proximity * 0.3 + node.glowIntensity * 0.2) * mobileOpacityMultiplier;
          drawWaypoint(node.x, node.y, node.scale, waypointOpacity);
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
      <div
        className="absolute inset-0 overflow-hidden"
        role="presentation"
        aria-hidden="true"
      >
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
      role="presentation"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial fade to keep text area clear */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, rgba(250, 250, 250, 0.85) 0%, rgba(250, 250, 250, 0.4) 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
}
