"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const COLORS = {
  accent: "#DC2626",
  success: "#22C55E",
  dark: "#18181B",
  border: "#27272A",
  borderLight: "#3F3F46",
  textMuted: "#52525B",
  textDim: "#71717A",
} as const;

interface LegendItemProps {
  color: string;
  label: string;
  variant?: "solid" | "dashed" | "circle" | "square";
}

function LegendItem({ color, label, variant = "solid" }: LegendItemProps) {
  const renderIndicator = () => {
    switch (variant) {
      case "dashed":
        return (
          <div
            className="h-[2px] w-4 border-t-2 border-dashed"
            style={{ borderColor: color }}
            aria-hidden="true"
          />
        );
      case "circle":
        return (
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        );
      case "square":
        return (
          <div
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        );
      default:
        return (
          <div
            className="h-[2px] w-4"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {renderIndicator()}
      <span className="font-[family-name:var(--font-mono)] text-[10px] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

interface FigureWrapperProps {
  children: ReactNode;
  ariaLabel: string;
  legend: ReactNode;
  className?: string;
}

function FigureWrapper({
  children,
  ariaLabel,
  legend,
  className = "",
}: FigureWrapperProps) {
  return (
    <figure className="w-full" role="img" aria-label={ariaLabel}>
      {children}
      <figcaption
        className={`mt-3 flex items-center justify-center gap-6 ${className}`}
      >
        {legend}
      </figcaption>
    </figure>
  );
}

export function AmazonDSPVisual() {
  const chartWidth = 320;
  const chartHeight = 160;
  const padding = { top: 25, right: 75, bottom: 25, left: 35 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const standardPath = `M 0,${innerHeight} L ${innerWidth},0`;
  const optimizedPath = `M 0,${innerHeight} L ${innerWidth * 0.75},0`;
  const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
  const packages = [0, 100, 200, 300];

  return (
    <FigureWrapper
      ariaLabel="Route performance chart showing optimized delivery pace achieving Fantastic Plus rating"
      legend={
        <>
          <LegendItem color="#71717A" label="Standard Pace" variant="dashed" />
          <LegendItem color={COLORS.accent} label="Optimized Performance" />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={COLORS.border}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <rect
          x={padding.left}
          y={padding.top}
          width={innerWidth}
          height={innerHeight}
          fill="url(#grid)"
        />

        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerHeight}
          stroke={COLORS.borderLight}
          strokeWidth="1"
        />
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={padding.left + innerWidth}
          y2={padding.top + innerHeight}
          stroke={COLORS.borderLight}
          strokeWidth="1"
        />

        {packages.map((pkg, i) => (
          <text
            key={pkg}
            x={padding.left - 5}
            y={
              padding.top +
              innerHeight -
              (i / (packages.length - 1)) * innerHeight +
              3
            }
            fill={COLORS.textMuted}
            fontSize="8"
            textAnchor="end"
            fontFamily="monospace"
          >
            {pkg}
          </text>
        ))}

        {hours.map((hour, i) => (
          <text
            key={hour}
            x={padding.left + (i / (hours.length - 1)) * innerWidth}
            y={chartHeight - 5}
            fill={COLORS.textMuted}
            fontSize="7"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {hour}
          </text>
        ))}

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <motion.path
            d={standardPath}
            fill="none"
            stroke={COLORS.textMuted}
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d={optimizedPath}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx={innerWidth * 0.75}
            cy={0}
            r="4"
            fill={COLORS.accent}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          />
        </g>

        <motion.text
          x={chartWidth - 8}
          y={12}
          fill={COLORS.success}
          fontSize="10"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          FANTASTIC+
        </motion.text>
      </svg>
    </FigureWrapper>
  );
}

export function RelayFreightVisual() {
  const width = 320;
  const height = 180;
  const centralHub = { x: width / 2, y: height / 2 };
  const satelliteHubs = [
    { x: 60, y: 40, label: "PHX" },
    { x: 260, y: 35, label: "DAL" },
    { x: 280, y: 140, label: "ATL" },
    { x: 160, y: 160, label: "MEM" },
    { x: 40, y: 130, label: "LAX" },
  ];

  const routes = satelliteHubs.map((hub, i) => ({
    id: i,
    from: centralHub,
    to: hub,
    duration: 2 + i * 0.5,
    delay: i * 0.3,
  }));

  return (
    <FigureWrapper
      ariaLabel="Freight network diagram showing trucks moving between distribution hubs"
      legend={
        <>
          <LegendItem color={COLORS.accent} label="Active Freight" variant="circle" />
          <LegendItem color={COLORS.borderLight} label="Distribution Hub" variant="circle" />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {routes.map((route) => (
          <g key={route.id}>
            <line
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke={COLORS.border}
              strokeWidth="1"
            />
            <motion.line
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke={COLORS.accent}
              strokeWidth="2"
              initial={{ pathLength: 0, strokeOpacity: 0.2 }}
              animate={{
                pathLength: 1,
                strokeOpacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                pathLength: { duration: 1, delay: route.delay },
                strokeOpacity: {
                  duration: 2,
                  repeat: Infinity,
                  delay: route.delay,
                },
              }}
            />
            <motion.circle
              cx={route.from.x}
              cy={route.from.y}
              r="4"
              fill={COLORS.accent}
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                cx: [route.from.x, route.to.x, route.to.x, route.from.x],
                cy: [route.from.y, route.to.y, route.to.y, route.from.y],
              }}
              transition={{
                duration: route.duration,
                delay: route.delay + 1,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
            />
          </g>
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle
            cx={centralHub.x}
            cy={centralHub.y}
            r="18"
            fill={COLORS.dark}
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x={centralHub.x}
            y={centralHub.y + 3}
            fill={COLORS.accent}
            fontSize="6"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            HUB
          </text>
        </motion.g>

        {satelliteHubs.map((hub, i) => (
          <motion.g
            key={hub.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
          >
            <circle
              cx={hub.x}
              cy={hub.y}
              r="12"
              fill={COLORS.dark}
              stroke={COLORS.borderLight}
              strokeWidth="1.5"
            />
            <text
              x={hub.x}
              y={hub.y + 3}
              fill={COLORS.textDim}
              fontSize="6"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {hub.label}
            </text>
          </motion.g>
        ))}

        <motion.text
          x={width - 8}
          y={14}
          fill={COLORS.textMuted}
          fontSize="8"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          LIVE NETWORK
        </motion.text>
      </svg>
    </FigureWrapper>
  );
}

export function FBAVisual() {
  const cols = 6;
  const rows = 4;
  const cellSize = 20;
  const gap = 4;
  const gridWidth = cols * cellSize + (cols - 1) * gap;
  const gridHeight = rows * cellSize + (rows - 1) * gap;
  const width = 280;
  const height = 160;
  const gridX = (width - gridWidth) / 2;
  const gridY = 30;

  const cells = Array.from({ length: rows * cols }, (_, i) => ({
    index: i,
    x: gridX + (i % cols) * (cellSize + gap),
    y: gridY + Math.floor(i / cols) * (cellSize + gap),
    scanDelay: ((i % cols) * 0.08) + (Math.floor(i / cols) * 0.06),
  }));

  return (
    <FigureWrapper
      ariaLabel="Inventory velocity grid showing high turnover stock management"
      legend={
        <>
          <LegendItem color="#3F3F46" label="Stagnant" variant="square" />
          <LegendItem color={COLORS.accent} label="High Velocity" variant="square" />
        </>
      }
      className="-mt-8 gap-4"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {cells.map((cell) => (
          <g key={cell.index}>
            <rect
              x={cell.x}
              y={cell.y}
              width={cellSize}
              height={cellSize}
              fill="#1C1C1C"
              stroke="#333"
              strokeWidth="0.5"
              rx="1"
            />
            <motion.rect
              x={cell.x + 1}
              y={cell.y + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              rx="1"
              initial={{ fill: "#252525", opacity: 0.5 }}
              animate={{
                fill: ["#252525", COLORS.accent, "#252525"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: 1 + cell.scanDelay,
                repeat: Infinity,
                repeatDelay: 0.3,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <motion.line
          x1={gridX - 5}
          y1={gridY}
          x2={gridX - 5}
          y2={gridY + gridHeight}
          stroke={COLORS.accent}
          strokeWidth="2"
          initial={{ opacity: 0, x1: gridX - 5, x2: gridX - 5 }}
          animate={{
            x1: [gridX - 5, gridX + gridWidth + 5, gridX + gridWidth + 5],
            x2: [gridX - 5, gridX + gridWidth + 5, gridX + gridWidth + 5],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <text
          x={20}
          y={18}
          fill={COLORS.textMuted}
          fontSize="9"
          fontFamily="monospace"
        >
          INVENTORY
        </text>

        <motion.text
          x={width - 20}
          y={18}
          fill={COLORS.success}
          fontSize="9"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          IPI &gt; 800
        </motion.text>
      </svg>
    </FigureWrapper>
  );
}

export function ParcelB2CVisual() {
  const width = 320;
  const height = 180;
  const origin = { x: 35, y: 85 };
  const injectionHub = { x: 160, y: 85 };
  const destinations = [
    { x: 250, y: 35 },
    { x: 280, y: 70 },
    { x: 285, y: 110 },
    { x: 260, y: 145 },
    { x: 220, y: 160 },
  ];
  const truckPath = `M ${origin.x} ${origin.y} L ${injectionHub.x} ${injectionHub.y}`;

  return (
    <FigureWrapper
      ariaLabel="Parcel injection network showing linehaul to hub then dispersing to delivery zones"
      legend={
        <>
          <LegendItem color={COLORS.accent} label="Linehaul (FTL)" />
          <LegendItem color="#FAFAFA" label="Last Mile Parcels" variant="square" />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={truckPath}
          stroke={COLORS.border}
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
        />

        {destinations.map((dest, i) => (
          <path
            key={`line-${i}`}
            d={`M ${injectionHub.x} ${injectionHub.y} L ${dest.x} ${dest.y}`}
            stroke={COLORS.border}
            strokeWidth="1"
            fill="none"
          />
        ))}

        <motion.path
          d={truckPath}
          stroke={COLORS.accent}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />

        {destinations.map((dest, i) => (
          <motion.path
            key={`path-${i}`}
            d={`M ${injectionHub.x} ${injectionHub.y} L ${dest.x} ${dest.y}`}
            stroke="#FAFAFA"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              pathLength: { duration: 0.8, delay: 2.5 + i * 0.15, ease: "easeOut" },
              opacity: { duration: 0.3, delay: 2.5 + i * 0.15 },
              repeat: Infinity,
              repeatDelay: 4.2 - i * 0.15,
            }}
          />
        ))}

        <circle
          cx={origin.x}
          cy={origin.y}
          r="12"
          fill={COLORS.dark}
          stroke={COLORS.borderLight}
          strokeWidth="1.5"
        />
        <text
          x={origin.x}
          y={origin.y + 3}
          fill={COLORS.textDim}
          fontSize="5"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          DC
        </text>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <circle
            cx={injectionHub.x}
            cy={injectionHub.y}
            r="16"
            fill={COLORS.dark}
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x={injectionHub.x}
            y={injectionHub.y - 22}
            fill={COLORS.accent}
            fontSize="6"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            INJECTION POINT
          </text>
        </motion.g>

        {destinations.map((dest, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          >
            <circle
              cx={dest.x}
              cy={dest.y}
              r="8"
              fill={COLORS.dark}
              stroke={COLORS.borderLight}
              strokeWidth="1"
            />
            <text
              x={dest.x}
              y={dest.y + 3}
              fill={COLORS.textMuted}
              fontSize="5"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              Z{i + 1}
            </text>
          </motion.g>
        ))}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [origin.x - 6, injectionHub.x - 30, injectionHub.x - 30, injectionHub.x - 30],
            y: [origin.y - 4, injectionHub.y - 4, injectionHub.y - 4, injectionHub.y - 4],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4.5,
          }}
        >
          <rect x={0} y={0} width="12" height="8" fill={COLORS.accent} rx="1" />
          <rect x={8} y={2} width="5" height="6" fill={COLORS.accent} rx="1" />
          <circle cx={3} cy={9} r="2" fill={COLORS.textMuted} />
          <circle cx={10} cy={9} r="2" fill={COLORS.textMuted} />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0, 0] }}
          transition={{
            duration: 2.5,
            times: [0, 0.2, 0.8, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 4.5,
          }}
        >
          <rect
            x={70}
            y={55}
            width="55"
            height="14"
            fill={COLORS.dark}
            stroke={COLORS.border}
            strokeWidth="0.5"
            rx="2"
          />
          <text
            x={97}
            y={64}
            fill={COLORS.success}
            fontSize="6"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            FTL: 100% UTIL
          </text>
        </motion.g>

        <motion.text
          x={width - 12}
          y={14}
          fill={COLORS.success}
          fontSize="8"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.4 }}
        >
          ZONE SKIP ACTIVE
        </motion.text>

        <text
          x={12}
          y={14}
          fill={COLORS.textMuted}
          fontSize="8"
          fontFamily="monospace"
        >
          INJECTION NETWORK
        </text>
      </svg>
    </FigureWrapper>
  );
}

export function TransportNetworkVisual() {
  const width = 320;
  const height = 180;
  const nodes = [
    { id: "A", x: 50, y: 90 },
    { id: "B", x: 170, y: 40 },
    { id: "C", x: 270, y: 90 },
    { id: "D", x: 170, y: 140 },
  ];

  const outboundPath = `M ${nodes[0].x} ${nodes[0].y} Q ${nodes[0].x + 60} ${nodes[1].y - 20} ${nodes[1].x} ${nodes[1].y} L ${nodes[2].x} ${nodes[2].y}`;
  const returnPath = `M ${nodes[2].x} ${nodes[2].y} Q ${nodes[2].x - 50} ${nodes[3].y + 20} ${nodes[3].x} ${nodes[3].y} L ${nodes[0].x} ${nodes[0].y}`;

  return (
    <FigureWrapper
      ariaLabel="Round trip route optimization showing loaded outbound and return legs"
      legend={
        <>
          <LegendItem color={COLORS.accent} label="Outbound (Loaded)" />
          <LegendItem color={COLORS.success} label="Return (Loaded)" />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={outboundPath} stroke={COLORS.border} strokeWidth="2" fill="none" />
        <path d={returnPath} stroke={COLORS.border} strokeWidth="2" fill="none" />

        <motion.path
          d={outboundPath}
          stroke={COLORS.accent}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
        />

        <motion.path
          d={returnPath}
          stroke={COLORS.success}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
        />

        {nodes.map((node, i) => {
          const isOrigin = node.id === "A";
          const isPickup = node.id === "D";
          const color = isOrigin ? COLORS.accent : isPickup ? COLORS.success : COLORS.borderLight;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isOrigin ? 14 : 10}
                fill={COLORS.dark}
                stroke={color}
                strokeWidth={isOrigin || isPickup ? 2 : 1.5}
              />
              <text
                x={node.x}
                y={node.y + 3}
                fill={color}
                fontSize="6"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {node.id}
              </text>
            </motion.g>
          );
        })}

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 5 }}
        >
          <rect x={85} y={22} width="50" height="14" fill={COLORS.dark} stroke={COLORS.accent} strokeWidth="0.5" rx="2" />
          <text x={110} y={31} fill={COLORS.accent} fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            LOADED →
          </text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 4.5, times: [0, 0.55, 0.6, 0.9, 1], repeat: Infinity, repeatDelay: 2.5 }}
        >
          <rect x={185} y={130} width="50" height="14" fill={COLORS.dark} stroke={COLORS.success} strokeWidth="0.5" rx="2" />
          <text x={210} y={139} fill={COLORS.success} fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ← LOADED
          </text>
        </motion.g>

        <motion.text
          x={width - 12}
          y={14}
          fill={COLORS.success}
          fontSize="9"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.5 }}
        >
          0% DEADHEAD
        </motion.text>

        <text x={12} y={14} fill={COLORS.textMuted} fontSize="8" fontFamily="monospace">
          PROFIT LOOP
        </text>
      </svg>
    </FigureWrapper>
  );
}

export function WarehouseVisual() {
  const width = 300;
  const height = 170;
  const rackWidth = 70;
  const rackHeight = 120;
  const rackGap = 20;
  const shelfCount = 5;
  const shelfHeight = rackHeight / shelfCount;
  const startX = (width - (3 * rackWidth + 2 * rackGap)) / 2;
  const startY = 35;
  const goldenZoneY = startY + 2 * shelfHeight;

  const isGoldenZone = (shelfIndex: number) => shelfIndex === 2;

  return (
    <FigureWrapper
      ariaLabel="Warehouse racking showing optimized slotting with high-velocity items in golden zone"
      legend={
        <>
          <LegendItem color={COLORS.accent} label="High Velocity" variant="square" />
          <LegendItem color="#27272A" label="Bulk Storage" variant="square" />
        </>
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="shelf-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[0, 1, 2].map((rackIndex) => {
          const rackX = startX + rackIndex * (rackWidth + rackGap);
          return (
            <g key={rackIndex}>
              <rect
                x={rackX}
                y={startY}
                width={rackWidth}
                height={rackHeight}
                fill="none"
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <line x1={rackX} y1={startY} x2={rackX} y2={startY + rackHeight} stroke={COLORS.borderLight} strokeWidth="2" />
              <line x1={rackX + rackWidth} y1={startY} x2={rackX + rackWidth} y2={startY + rackHeight} stroke={COLORS.borderLight} strokeWidth="2" />

              {Array.from({ length: shelfCount }).map((_, shelfIndex) => {
                const shelfY = startY + shelfIndex * shelfHeight;
                const isGolden = isGoldenZone(shelfIndex);
                return (
                  <g key={shelfIndex}>
                    <line x1={rackX} y1={shelfY} x2={rackX + rackWidth} y2={shelfY} stroke={COLORS.borderLight} strokeWidth="1" />
                    <motion.rect
                      x={rackX + 3}
                      y={shelfY + 3}
                      width={rackWidth - 6}
                      height={shelfHeight - 6}
                      rx="1"
                      fill={isGolden ? COLORS.accent : "#1C1C1C"}
                      initial={{ opacity: isGolden ? 0 : 0.6 }}
                      animate={{ opacity: isGolden ? [0.4, 0.9, 0.4] : 0.6 }}
                      transition={{
                        duration: 1.5,
                        delay: rackIndex * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      filter={isGolden ? "url(#shelf-glow)" : undefined}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        <motion.circle
          cx={startX + 10}
          cy={goldenZoneY + shelfHeight / 2}
          r="4"
          fill="#FAFAFA"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 1, 1, 0],
            cx: [
              startX + 10,
              startX + rackWidth - 10,
              startX + rackWidth + rackGap + 10,
              startX + rackWidth + rackGap + rackWidth - 10,
              startX + 2 * (rackWidth + rackGap) + 10,
              startX + 2 * (rackWidth + rackGap) + rackWidth - 10,
              startX + 2 * (rackWidth + rackGap) + rackWidth - 10,
            ],
            cy: Array(7).fill(goldenZoneY + shelfHeight / 2),
          }}
          transition={{ duration: 3, delay: 1, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
        />

        <text x={12} y={14} fill={COLORS.textMuted} fontSize="8" fontFamily="monospace">
          SLOTTING LOGIC
        </text>

        <motion.text
          x={width - 12}
          y={14}
          fill={COLORS.success}
          fontSize="9"
          fontWeight="bold"
          textAnchor="end"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          PICK OPTIMIZED
        </motion.text>

        <text
          x={width / 2}
          y={goldenZoneY + shelfHeight / 2 + 3}
          fill={COLORS.textDim}
          fontSize="5"
          textAnchor="middle"
          fontFamily="monospace"
        >
          GOLDEN ZONE
        </text>
      </svg>
    </FigureWrapper>
  );
}
