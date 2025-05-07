import type { Cryptocurrency } from '../types/crypto';

import bitcoinImg from '../assets/bitcoin.svg';
import ethereumImg from '../assets/ethereum.svg';
import tetherImg from '../assets/tether.svg';
import xrpImg from '../assets/xrp.svg';
import bnbImg from '../assets/bnb.svg';
import solanaImg from '../assets/solana.svg';

// Generate random chart data (7 points for 7 days)
const generateChartData = (trend: 'up' | 'down' | 'neutral', volatility = 0.1): number[] => {
  const data: number[] = [];
  let value = 100; // Start with 100 as the baseline
  
  for (let i = 0; i < 7; i++) {
    // Determine trend influence (up: mostly positive, down: mostly negative, neutral: balanced)
    let trendFactor = 0;
    
    switch(trend) {
      case 'up':
        trendFactor = 0.03; // Positive bias
        break;
      case 'down':
        trendFactor = -0.03; // Negative bias
        break;
      case 'neutral':
        trendFactor = 0; // No bias
        break;
    }
    
    // Calculate random change with trend bias
    const change = (Math.random() * volatility * 2 - volatility) + trendFactor;
    value = value * (1 + change);
    data.push(value);
  }
  
  return data;
};

// Sample cryptocurrency data
export const sampleCryptoData: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 93759.48,
    percentChange1h: 0.43,
    percentChange24h: 0.93,
    percentChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    logo: bitcoinImg,
    chartData: generateChartData('up', 0.05),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1802.46,
    percentChange1h: 0.60,
    percentChange24h: 3.21,
    percentChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    logo: ethereumImg,
    chartData: generateChartData('up', 0.08),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    percentChange1h: 0.00,
    percentChange24h: 0.00,
    percentChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    logo: tetherImg,
    chartData: generateChartData('neutral', 0.01),
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    price: 2.22,
    percentChange1h: 0.46,
    percentChange24h: 0.54,
    percentChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    logo: xrpImg,
    chartData: generateChartData('up', 0.07),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    price: 606.65,
    percentChange1h: 0.09,
    percentChange24h: -1.20,
    percentChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    logo: bnbImg,
    chartData: generateChartData('neutral', 0.06),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    price: 151.51,
    percentChange1h: 0.53,
    percentChange24h: 1.26,
    percentChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    logo: solanaImg,
    chartData: generateChartData('up', 0.09),
  },
];