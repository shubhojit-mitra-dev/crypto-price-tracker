import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriceChangeProps {
  value: number;
  className?: string;
}

export function PriceChange({ value, className }: PriceChangeProps) {
  const isPositive = value >= 0;
  const displayValue = Math.abs(value).toFixed(2);

  return (
    <div 
      className={cn(
        'flex items-center gap-1 font-medium',
        isPositive ? 'text-green-500' : 'text-red-500',
        className
      )}
    >
      {isPositive ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
      <span>{displayValue}%</span>
    </div>
  );
}