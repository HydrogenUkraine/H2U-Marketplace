interface Listing {
  publicKey: string;
  canisterPublicKey: string;
  price: number;
  amount: number;
  transferManagerAta: string;
  producer: string;
  tokenMint: string;
  batchId: string;
  productionDate: string;
  eacMint: string;
}

interface MarketplaceState {
  data: Listing[];
  loading: boolean;
  error: string | null;
}
