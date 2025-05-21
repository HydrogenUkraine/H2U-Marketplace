import { atom } from "jotai";
import { api } from "../api/api";
import { ActionOptions } from "./action-options";

// Define the shape of the oracle price state
interface OraclePriceState {
  minPricePerKg: number | null;
  maxPricePerKg: number | null;
  lastUpdated: number | null;
  loading: boolean;
  error: string | null;
}

// Initialize the oracle price atom
export const oraclePriceAtom = atom<OraclePriceState>({
  minPricePerKg: null,
  maxPricePerKg: null,
  lastUpdated: null,
  loading: false,
  error: null,
});

// Action to fetch the current oracle price
export const fetchOraclePriceAtom = atom(
  get => get(oraclePriceAtom),
  async (get, set) => {
    set(oraclePriceAtom, { ...get(oraclePriceAtom), loading: true, error: null });

    try {
      const response = await api.get('/oracle/price');
      const { minPricePerKg, maxPricePerKg, lastUpdated } = response.data.data;

      set(oraclePriceAtom, {
        minPricePerKg,
        maxPricePerKg,
        lastUpdated,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set(oraclePriceAtom, {
        minPricePerKg: null,
        maxPricePerKg: null,
        lastUpdated: null,
        loading: false,
        error: errorMessage,
      });
    }
  }
);

// Action to update the oracle price
export const updateOraclePriceAtom = atom(
  get => get(oraclePriceAtom),
  async (get, set, { newMin, newMax, options }: { newMin: number; newMax: number; options: ActionOptions }) => {
    set(oraclePriceAtom, { ...get(oraclePriceAtom), loading: true, error: null });

    try {
      await api.post('/oracle/price', { newMin, newMax });

      // After updating, fetch the latest price to ensure state consistency
      const response = await api.get('/oracle/price');
      const { minPricePerKg, maxPricePerKg, lastUpdated } = response.data.data;

      set(oraclePriceAtom, {
        minPricePerKg,
        maxPricePerKg,
        lastUpdated,
        loading: false,
        error: null,
      });

      options?.onSuccess?.();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set(oraclePriceAtom, {
        ...get(oraclePriceAtom),
        loading: false,
        error: errorMessage,
      });
      options?.onError?.();
    }
  }
);