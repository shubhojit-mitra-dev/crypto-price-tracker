import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from "../ui/button";

export type SortField = 'rank' | 'name' | 'price' | 'percentChange1h' | 'percentChange24h' | 'percentChange7d' | 'marketCap' | 'volume24h';
export type FilterType = 'all' | 'gainers' | 'losers';

interface CryptoFiltersProps {
  onSortChange: (field: SortField, direction: 'asc' | 'desc') => void;
  onFilterChange: (filter: FilterType) => void;
  activeSort: { field: SortField; direction: 'asc' | 'desc' };
  activeFilter: FilterType;
}

export function CryptoFilters({ 
  onSortChange, 
  onFilterChange, 
  activeSort, 
  activeFilter 
}: CryptoFiltersProps) {
  const sortOptions: { label: string; value: SortField }[] = [
    { label: 'Rank', value: 'rank' },
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: '1h %', value: 'percentChange1h' },
    { label: '24h %', value: 'percentChange24h' },
    { label: '7d %', value: 'percentChange7d' },
    { label: 'Market Cap', value: 'marketCap' },
    { label: 'Volume 24h', value: 'volume24h' },
  ];

  const handleSortClick = (field: SortField) => {
    const newDirection = 
      activeSort.field === field && activeSort.direction === 'desc' ? 'asc' : 'desc';
    onSortChange(field, newDirection);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">Sort by:</span>
        {sortOptions.map(option => (
          <Button
            key={option.value}
            variant={activeSort.field === option.value ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => handleSortClick(option.value)}
            className="flex items-center gap-1"
          >
            {option.label}
            {activeSort.field === option.value && (
              activeSort.direction === 'desc' ? 
                <ArrowDown className="h-3 w-3" /> : 
                <ArrowUp className="h-3 w-3" />
            )}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium">Filter:</span>
        <Button
          variant={activeFilter === 'all' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          All
        </Button>
        <Button
          variant={activeFilter === 'gainers' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('gainers')}
        >
          Top Gainers
        </Button>
        <Button
          variant={activeFilter === 'losers' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('losers')}
        >
          Top Losers
        </Button>
      </div>
    </div>
  );
}