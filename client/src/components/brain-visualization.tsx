import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BrainImpact } from "@/types";

interface BrainRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  impact: number;
  description: string;
}

const brainRegions: BrainRegion[] = [
  {
    id: "prefrontal",
    name: "Prefrontal Cortex",
    x: 120,
    y: 80,
    size: 40,
    color: "var(--focus)",
    impact: 20,
    description: "Executive function, attention, decision-making",
  },
  {
    id: "hippocampus",
    name: "Hippocampus",
    x: 100,
    y: 140,
    size: 35,
    color: "var(--memory)",
    impact: 15,
    description: "Memory formation and retrieval",
  },
  {
    id: "amygdala",
    name: "Amygdala",
    x: 85,
    y: 160,
    size: 25,
    color: "var(--mood)",
    impact: 12,
    description: "Emotional processing and mood regulation",
  },
  {
    id: "brainstem",
    name: "Brainstem",
    x: 90,
    y: 200,
    size: 30,
    color: "var(--energy)",
    impact: 18,
    description: "Arousal, energy regulation, sleep-wake cycles",
  },
  {
    id: "cerebellum",
    name: "Cerebellum",
    x: 60,
    y: 180,
    size: 35,
    color: "var(--sleep)",
    impact: 10,
    description: "Motor coordination, cognitive balance",
  },
];

interface BrainVisualizationProps {
  impact?: BrainImpact;
  interactive?: boolean;
  size?: "small" | "medium" | "large";
}

export default function BrainVisualization({ 
  impact,
  interactive = true,
  size = "medium" 
}: BrainVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  const dimensions = {
    small: { width: 200, height: 240 },
    medium: { width: 250, height: 300 },
    large: { width: 300, height: 360 },
  }[size];

  useEffect(() => {
    if (!interactive) return;

    const interval = setInterval(() => {
      // Simulate neural activity by randomly activating connections
      const randomRegions = brainRegions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map(r => r.id);
      
      setActiveConnections(randomRegions);

      setTimeout(() => {
        setActiveConnections([]);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [interactive]);

  const getRegionImpact = (regionId: string): number => {
    if (!impact) return brainRegions.find(r => r.id === regionId)?.impact || 0;
    
    switch (regionId) {
      case "prefrontal":
        return impact.focus;
      case "hippocampus":
        return impact.memory;
      case "amygdala":
        return impact.mood;
      case "brainstem":
        return impact.energy;
      case "cerebellum":
        return impact.sleep;
      default:
        return 0;
    }
  };

  const generateNeuralConnections = () => {
    const connections = [];
    
    for (let i = 0; i < brainRegions.length; i++) {
      for (let j = i + 1; j < brainRegions.length; j++) {
        const region1 = brainRegions[i];
        const region2 = brainRegions[j];
        
        // Calculate distance to determine if regions should be connected
        const distance = Math.sqrt(
          Math.pow(region1.x - region2.x, 2) + Math.pow(region1.y - region2.y, 2)
        );
        
        if (distance < 100) {
          connections.push({
            id: `${region1.id}-${region2.id}`,
            x1: region1.x,
            y1: region1.y,
            x2: region2.x,
            y2: region2.y,
            active: activeConnections.includes(region1.id) || activeConnections.includes(region2.id),
          });
        }
      }
    }
    
    return connections;
  };

  const connections = generateNeuralConnections();

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="mx-auto"
        data-testid="brain-visualization"
      >
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
          
          <filter id="neuralGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Brain outline */}
        <motion.path
          d="M 80 60 C 60 40, 140 30, 160 60 C 180 40, 200 80, 180 120 C 190 160, 160 200, 120 210 C 80 220, 50 180, 60 140 C 40 100, 60 80, 80 60 Z"
          fill="none"
          stroke="rgba(139, 92, 246, 0.3)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Neural connections */}
        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke={connection.active ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.2)"}
            strokeWidth={connection.active ? "2" : "1"}
            filter={connection.active ? "url(#neuralGlow)" : "none"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Brain regions */}
        {brainRegions.map((region, index) => {
          const regionImpact = getRegionImpact(region.id);
          const isHovered = hoveredRegion === region.id;
          const isActive = activeConnections.includes(region.id);
          
          return (
            <g key={region.id}>
              {/* Region glow effect */}
              <motion.circle
                cx={region.x}
                cy={region.y}
                r={region.size + 10}
                fill="url(#brainGlow)"
                opacity={isHovered || isActive ? 0.6 : 0.2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              />
              
              {/* Main region circle */}
              <motion.circle
                cx={region.x}
                cy={region.y}
                r={region.size}
                fill={region.color}
                opacity={isHovered || isActive ? 0.8 : 0.6}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                filter={isActive ? "url(#neuralGlow)" : "none"}
                style={{ cursor: interactive ? "pointer" : "default" }}
                onMouseEnter={() => interactive && setHoveredRegion(region.id)}
                onMouseLeave={() => interactive && setHoveredRegion(null)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1.2 : 1, 
                  opacity: isHovered || isActive ? 0.9 : 0.6 
                }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300 
                }}
                data-testid={`brain-region-${region.id}`}
              />
              
              {/* Impact indicator */}
              {regionImpact > 0 && (
                <motion.text
                  x={region.x}
                  y={region.y + 4}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                >
                  +{regionImpact}%
                </motion.text>
              )}
              
              {/* Neural pulse animation */}
              {isActive && (
                <motion.circle
                  cx={region.x}
                  cy={region.y}
                  r={region.size}
                  fill="none"
                  stroke={region.color}
                  strokeWidth="3"
                  opacity="0.8"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Region tooltip */}
      {hoveredRegion && interactive && (
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          data-testid="brain-region-tooltip"
        >
          <Card className="p-3 bg-background/90 backdrop-blur-sm border border-border">
            <div className="text-sm font-medium">
              {brainRegions.find(r => r.id === hoveredRegion)?.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {brainRegions.find(r => r.id === hoveredRegion)?.description}
            </div>
            <div className="text-xs mt-2 font-medium" style={{ color: brainRegions.find(r => r.id === hoveredRegion)?.color }}>
              Enhancement: +{getRegionImpact(hoveredRegion)}%
            </div>
          </Card>
        </motion.div>
      )}

      {/* Neural activity indicator */}
      {interactive && activeConnections.length > 0 && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Neural Activity</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
