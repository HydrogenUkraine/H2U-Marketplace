import { useAtom } from 'jotai';
import { fetchMarketplaceListingsAtom, listingAtom, placeBidAtom } from '@/lib/jotai/marketplace-actions';

export const useMarketplace = () => {
  const [marketplaceListings, fetchMarketplaceListings] = useAtom(fetchMarketplaceListingsAtom);
  const [currentListing, setCurrentListing] = useAtom(listingAtom);
  const [_, placeBid] = useAtom(placeBidAtom);

  return {
    marketplaceListings,
    fetchMarketplaceListings,
    currentListing, 
    setCurrentListing,
    placeBid
  };
};