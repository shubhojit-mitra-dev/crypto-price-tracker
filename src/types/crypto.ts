export interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  logo: string;
  chartData: number[]; // For 7-day chart
}

export type CryptoState = {
  entities: Record<string, Cryptocurrency>;
  ids: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};