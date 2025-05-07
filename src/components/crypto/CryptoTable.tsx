import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCryptos, selectTopGainers24h, selectTopLosers24h } from '../../features/crypto/cryptoSelectors';
import { PriceChange } from './PriceChange';
import { MiniChart } from './MiniChart';
import { CryptoFilters, type SortField, type FilterType } from './CryptoFilters';
import type { Cryptocurrency } from '../../types/crypto';

// Get stored preferences from localStorage or use defaults
const getStoredPreferences = () => {
  if (typeof window === 'undefined') {
    return {
      sortField: 'marketCap' as SortField,
      sortDirection: 'desc' as 'asc' | 'desc',
      filterType: 'all' as FilterType,
    };
  }
  
  try {
    const stored = localStorage.getItem('crypto-preferences');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Error loading preferences from localStorage:', err);
  }
  
  return {
    sortField: 'marketCap' as SortField,
    sortDirection: 'desc' as 'asc' | 'desc',
    filterType: 'all' as FilterType,
  };
};

export function CryptoTable() {
  // Get all cryptocurrencies
  const allCryptos = useSelector(selectAllCryptos);
  const topGainers = useSelector(selectTopGainers24h);
  const topLosers = useSelector(selectTopLosers24h);
  
  // User preferences state with localStorage persistence
  const [preferences, setPreferences] = useState(getStoredPreferences);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('crypto-preferences', JSON.stringify(preferences));
    } catch (err) {
      console.error('Error saving preferences to localStorage:', err);
    }
  }, [preferences]);
  
  // Handle sort changes
  const handleSortChange = (field: SortField, direction: 'asc' | 'desc') => {
    setPreferences((prev: { 
      sortField: SortField; 
      sortDirection: 'asc' | 'desc'; 
      filterType: FilterType;
    }): { 
      sortField: SortField; 
      sortDirection: 'asc' | 'desc'; 
      filterType: FilterType;
    } => ({
      ...prev,
      sortField: field,
      sortDirection: direction,
    }));
  };
  
  // Handle filter changes
  const handleFilterChange = (filter: FilterType) => {
    setPreferences((prev: {
        sortField: SortField;
        sortDirection: 'asc' | 'desc';
        filterType: FilterType;
    }): {
        sortField: SortField;
        sortDirection: 'asc' | 'desc';
        filterType: FilterType;
    } => ({
        ...prev,
        filterType: filter,
    }));
  };
  
  // Filter and sort cryptos based on current preferences
  const displayedCryptos = useMemo(() => {
    // First apply filtering
    let filteredCryptos: Cryptocurrency[] = [];
    
    switch (preferences.filterType) {
      case 'gainers':
        filteredCryptos = [...topGainers];
        break;
      case 'losers':
        filteredCryptos = [...topLosers];
        break;
      default:
        filteredCryptos = [...allCryptos];
    }
    
    // Then sort the filtered list
    return filteredCryptos.sort((a, b) => {
      const fieldA = a[preferences.sortField as keyof Cryptocurrency];
      const fieldB = b[preferences.sortField as keyof Cryptocurrency];
      
      // Special case for string fields
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return preferences.sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      // Numeric comparison
      if (preferences.sortDirection === 'asc') {
        return (fieldA as number) - (fieldB as number);
      } else {
        return (fieldB as number) - (fieldA as number);
      }
    });
  }, [allCryptos, topGainers, topLosers, preferences]);
  
  // Format large numbers with commas and abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  // Determine chart trend direction
  const getChartTrend = (percentChange7d: number): 'up' | 'down' | 'neutral' => {
    if (percentChange7d > 0) return 'up';
    if (percentChange7d < 0) return 'down';
    return 'neutral';
  };

  return (
    <>
      <CryptoFilters 
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        activeSort={{
          field: preferences.sortField,
          direction: preferences.sortDirection,
        }}
        activeFilter={preferences.filterType}
      />
      
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">1h %</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-right">7d %</th>
              <th className="px-4 py-3 text-right">Market Cap</th>
              <th className="px-4 py-3 text-right">Volume(24h)</th>
              <th className="px-4 py-3 text-right">Circulating Supply</th>
              <th className="px-4 py-3 text-center">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {displayedCryptos.map(crypto => (
              <tr key={crypto.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-4 text-center">{crypto.rank}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={crypto.logo} 
                      alt={crypto.name} 
                      className="h-6 w-6"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/24x24?text=?';
                      }}
                    />
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  ${crypto.price.toLocaleString(undefined, { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </td>
                <td className="px-4 py-4 text-right">
                  <PriceChange value={crypto.percentChange1h} />
                </td>
                <td className="px-4 py-4 text-right">
                  <PriceChange value={crypto.percentChange24h} />
                </td>
                <td className="px-4 py-4 text-right">
                  <PriceChange value={crypto.percentChange7d} />
                </td>
                <td className="px-4 py-4 text-right">
                  {formatNumber(crypto.marketCap)}
                </td>
                <td className="px-4 py-4 text-right">
                  {formatNumber(crypto.volume24h)}
                </td>
                <td className="px-4 py-4 text-right">
                  {crypto.circulatingSupply.toFixed(2)} {crypto.symbol}
                  {crypto.maxSupply && (
                    <div className="text-xs text-muted-foreground">
                      {Math.round((crypto.circulatingSupply / crypto.maxSupply) * 100)}% of max supply
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  <MiniChart 
                    data={crypto.chartData} 
                    trend={getChartTrend(crypto.percentChange7d)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}