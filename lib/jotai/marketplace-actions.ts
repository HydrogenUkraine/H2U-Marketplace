import { atom } from "jotai";
import { api } from "../api/api";
import { ActionOptions } from "./action-options";

export const marketplaceAtom = atom<MarketplaceState>({
    data: [],
    loading: false,
    error: null,
  });

export const listingAtom = atom<Listing | null>(null);


// Action to fetch listings and setup marketplace if empty
export const fetchMarketplaceListingsAtom = atom(
    get => get(marketplaceAtom), 
    async (get, set) => {
    set(marketplaceAtom, { ...get(marketplaceAtom), loading: true, error: null });
  
    try {
      // Fetch listings
      const response = await api.get('/marketplace/listings');
      let listings = response.data;
  
      set(marketplaceAtom, {
        data: listings,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      set(marketplaceAtom, {
        data: [],
        loading: false,
        error: errorMessage,
      });
    }
  });

  export const placeBidAtom = atom(
    get => get(marketplaceAtom),
    async (get, set, { listingPublicKey, amount, offeredPrice, options }: { listingPublicKey: string; amount: number; offeredPrice: number, options: ActionOptions }) => {
      set(marketplaceAtom, { ...get(marketplaceAtom), loading: true, error: null });
  
      try {
        const response = await api.post('/marketplace/place-bid', {
          listingPublicKey,
          amount,
          offeredPrice,
        });
        const updatedListing: Listing = response.data;
  
        // Update marketplaceAtom with the updated listing
        const currentMarketplace = get(marketplaceAtom);
        const updatedData = currentMarketplace.data.map(listing =>
          listing.publicKey === listingPublicKey ? updatedListing : listing
        );
  
        set(marketplaceAtom, {
          data: updatedData,
          loading: false,
          error: null,
        });
  
        // Update listingAtom if the bid is for the current listing
        const currentListing = get(listingAtom);
        if (currentListing && currentListing.publicKey === listingPublicKey) {
          set(listingAtom, updatedListing);
        }
  
        options?.onSuccess?.();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        set(marketplaceAtom, {
          ...get(marketplaceAtom),
          loading: false,
          error: errorMessage,
        });
        options?.onError?.();
      }
    }
  );