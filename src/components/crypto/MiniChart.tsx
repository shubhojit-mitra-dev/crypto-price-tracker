import { cn } from "../../lib/utils";

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  trend: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MiniChart({
  data,
  width = 120,
  height = 40,
  trend,
  className
}: MiniChartProps) {
  // Calculate points for a simple line chart
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero

  // Normalize data to fit in the SVG
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  // Determine color based on trend
  const strokeColor = trend === 'up' 
    ? 'stroke-green-500' 
    : trend === 'down' 
      ? 'stroke-red-500' 
      : 'stroke-gray-500';

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          className={cn("stroke-2", strokeColor)}
          points={points}
        />
      </svg>
    </div>
  );
}