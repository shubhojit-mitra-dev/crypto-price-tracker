import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CryptoState } from '../../types/crypto';
import type { Cryptocurrency } from '../../types/crypto';

const initialState: CryptoState = {
  entities: {},
  ids: [],
  status: 'idle',
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    fetchCryptoStart: (state) => {
      state.status = 'loading';
    },
    fetchCryptoSuccess: (state, action: PayloadAction<Cryptocurrency[]>) => {
      state.status = 'succeeded';
      // Normalize the data
      const newEntities: Record<string, Cryptocurrency> = {};
      const newIds: string[] = [];
      
      action.payload.forEach((crypto) => {
        newEntities[crypto.id] = crypto;
        newIds.push(crypto.id);
      });
      
      state.entities = newEntities;
      state.ids = newIds;
    },
    fetchCryptoFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; updates: Partial<Cryptocurrency> }>) => {
      const { id, updates } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = {
          ...state.entities[id],
          ...updates,
        };
      }
    },
    updateMultipleCryptos: (state, action: PayloadAction<Record<string, Partial<Cryptocurrency>>>) => {
      const updates = action.payload;
      Object.keys(updates).forEach((id) => {
        if (state.entities[id]) {
          state.entities[id] = {
            ...state.entities[id],
            ...updates[id],
          };
        }
      });
    },
  },
});

export const {
  fetchCryptoStart,
  fetchCryptoSuccess,
  fetchCryptoFailure,
  updateCryptoPrice,
  updateMultipleCryptos,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;