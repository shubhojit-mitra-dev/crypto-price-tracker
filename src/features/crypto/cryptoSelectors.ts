import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Cryptocurrency } from '../../types/crypto';


// Basic selectors
export const selectCryptoEntities = (state: RootState) => state.crypto.entities;
export const selectCryptoIds = (state: RootState) => state.crypto.ids;
export const selectCryptoStatus = (state: RootState) => state.crypto.status;
export const selectCryptoError = (state: RootState) => state.crypto.error;

// Derived selectors
export const selectAllCryptos = createSelector(
  [selectCryptoEntities, selectCryptoIds],
  (entities, ids) => ids.map(id => entities[id])
);

// Get a specific crypto by ID
export const selectCryptoById = (id: string) => 
  createSelector(
    selectCryptoEntities,
    (entities) => entities[id]
  );

// Get top gainers in the last 24 hours
export const selectTopGainers24h = createSelector(
  selectAllCryptos,
  (cryptos) => [...cryptos].sort((a, b) => b.percentChange24h - a.percentChange24h).slice(0, 5)
);

// Get top losers in the last 24 hours
export const selectTopLosers24h = createSelector(
  selectAllCryptos,
  (cryptos) => [...cryptos].sort((a, b) => a.percentChange24h - b.percentChange24h).slice(0, 5)
);

// Utility selector for sorted cryptos
export const selectSortedCryptos = (sortKey: keyof Cryptocurrency, ascending: boolean = true) =>
  createSelector(
    selectAllCryptos,
    (cryptos) => {
      return [...cryptos].sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        
        // Handle null/undefined values
        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return ascending ? 1 : -1;
        if (valueB == null) return ascending ? -1 : 1;
        
        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
      });
    }
  );

// Default selector for cryptos sorted by market cap
export const selectCryptosByMarketCap = selectSortedCryptos('marketCap', false);