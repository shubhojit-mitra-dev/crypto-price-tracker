import { store } from '../store';
import { updateMultipleCryptos } from '../features/crypto/cryptoSlice';
import type { Cryptocurrency } from '../types/crypto';

export class CryptoSocketService {
  private intervalId: number | null = null;
  private updateFrequency: number;
  
  constructor(updateFrequencyMs = 1500) {
    this.updateFrequency = updateFrequencyMs;
  }

  // Start simulating real-time updates
  start(): void {
    if (this.intervalId !== null) {
      console.warn('WebSocket simulation already running');
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.generateRandomUpdates();
    }, this.updateFrequency);
  }

  // Stop the simulation
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Generate random price updates for cryptocurrencies
  private generateRandomUpdates(): void {
    const state = store.getState();
    const crypto = state.crypto as unknown as { ids: string[]; entities: Record<string, Cryptocurrency> };
    const cryptoIds = crypto.ids;
    const cryptoEntities = crypto.entities;
    
    if (cryptoIds.length === 0) return;
    
    // Update only a subset of cryptocurrencies each time (1-3 random cryptos)
    const numToUpdate = Math.floor(Math.random() * 3) + 1;
    const idsToUpdate = this.getRandomElements(cryptoIds, numToUpdate);
    
    const updates: Record<string, Partial<Cryptocurrency>> = {};
    
    idsToUpdate.forEach(id => {
      const crypto = cryptoEntities[id];
      if (!crypto) return;
      
      // Generate a random price change between -2% and +2%
      const priceChangePercent = (Math.random() * 4 - 2) / 100;
      const newPrice = +(crypto.price * (1 + priceChangePercent)).toFixed(2);
      
      // Update 1h percent change (small random variation)
      const new1hChange = +(crypto.percentChange1h + (Math.random() * 0.4 - 0.2)).toFixed(2);
      
      // Update 24h percent change (small random variation)
      const new24hChange = +(crypto.percentChange24h + (Math.random() * 0.4 - 0.2)).toFixed(2);
      
      // Update volume (random variation up to 1%)
      const volumeChange = (Math.random() * 2 - 1) / 100;
      const newVolume = Math.round(crypto.volume24h * (1 + volumeChange));
      
      updates[id] = {
        price: newPrice,
        percentChange1h: new1hChange,
        percentChange24h: new24hChange,
        volume24h: newVolume,
      };
    });
    
    // Dispatch updates to Redux
    store.dispatch(updateMultipleCryptos(updates));
  }
  
  private getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

// Create singleton instance
export const cryptoSocketService = new CryptoSocketService();