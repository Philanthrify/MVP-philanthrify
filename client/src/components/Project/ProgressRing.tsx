import { useTheme } from "@mui/material";
import React from "react";

interface RingProps {
  colour: string;
  percentage?: number;
  radius: number;
  thickness?: number;
  cx?: number;
  cy?: number;
}

interface TextProps {
  percentage: number;
}

// Props for the main ProgressRing component
interface ProgressRingProps {
  percentage: number; // Completion percentage of the circle
  doneColour: string; // Color of the completed part
  unDoneColour: string; // Color of the incomplete part
  innerColour: string; // Color of the inner circle
  radius: number; // Radius of the circle
  thickness?: number; // Thickness of the ring
}

// Helper function to ensure the percentage is within 0-100 range
const cleanPercentage = (percentage: number): number => {
  const isNegativeOrNaN = !Number.isFinite(percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : percentage;
};

// Ring component representing either the completed or incomplete part of the ring
const Ring: React.FC<RingProps> = ({
  colour,
  percentage = 100,
  radius,
  thickness = 10,
  cx = 100,
  cy = 100,
}) => {
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - percentage) * circ) / 100;
  return (
    <circle
      r={radius}
      cx={cx}
      cy={cy}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth={thickness} // Adjusted to a numeric value
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round" // round ends
    />
  );
};

// Text component displaying the completion percentage
const Text: React.FC<TextProps> = ({ percentage }) => {
  const { palette } = useTheme();
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
      fill={palette.white.light}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

// Main ProgressRing component displaying a circular progress indicator
const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  doneColour,
  unDoneColour,
  innerColour,
  radius,
  thickness = 10,
}) => {
  const pct = cleanPercentage(percentage);
  var diameter = 2 * radius;
  if (thickness) {
    diameter = diameter + thickness;
  } // Calculating the diameter
  const svgSize = diameter;
  const location = radius + thickness / 2; //
  return (
    <svg width={svgSize} height={svgSize}>
      <g
        transform={`rotate(-90 ${radius + thickness / 2} ${
          radius + thickness / 2
        })`}
      >
        {/* Background circle */}
        <circle r={radius} cx={location} cy={location} fill={innerColour} />
        <Ring
          colour={unDoneColour}
          radius={radius}
          thickness={thickness}
          cx={location}
          cy={location}
        />
        <Ring
          colour={doneColour}
          percentage={pct}
          radius={radius}
          thickness={thickness}
          cx={location}
          cy={location}
        />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default ProgressRing;
