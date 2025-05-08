// atoms/authState.ts
import { User } from "@/lib/types";
import { atomWithStorage } from "jotai/utils";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const authStateAtom = atomWithStorage<AuthState>('h2_marketplace_auth', {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
});