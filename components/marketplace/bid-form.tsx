'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useMarketplace } from "@/hooks/marketplace.hooks";
import { useOracle } from "@/hooks/oracle.hooks";

interface BidPageProps {
  amount: number; // Initial amount in kg
  pricePerKg: number; // Initial price per kg in USDC (will be overridden by oracle price)
}

export default function BidForm({ props }: { props: BidPageProps }) {
  const { currentListing, placeBid } = useMarketplace();
  const { oraclePrice, fetchOraclePrice } = useOracle();
  const { amount: maxAmount } = props;

  const [amount, setAmount] = useState(Math.min(maxAmount, 1)); // Default to 1 kg or max
  const [pricePerKg, setPricePerKg] = useState(0); // Will be set based on oracle price
  const [isLoading, setIsLoading] = useState(false);

  // Fetch oracle price on mount
  useEffect(() => {
    fetchOraclePrice();
  }, [fetchOraclePrice]);

  // Set initial pricePerKg based on oracle price and update min/max
  const minPrice = oraclePrice.minPricePerKg ?? 0; // Default to 0 if not loaded
  const maxPrice = oraclePrice.maxPricePerKg ?? Infinity; // Default to Infinity if not loaded

  useEffect(() => {
    if (oraclePrice.minPricePerKg !== null) {
      setPricePerKg(oraclePrice.minPricePerKg); // Start at the minimum price from oracle
    }
  }, [oraclePrice.minPricePerKg]);

  // Ensure pricePerKg stays within oracle range
  useEffect(() => {
    if (pricePerKg < minPrice) {
      setPricePerKg(minPrice);
    } else if (pricePerKg > maxPrice) {
      setPricePerKg(maxPrice);
    }
  }, [pricePerKg, minPrice, maxPrice]);

  // Ensure amount doesn't exceed maxAmount
  const handleAmountChange = (value: number) => {
    setAmount(Math.min(value, maxAmount));
  };

  const totalPrice = amount * pricePerKg;

  const handlePlaceBid = async () => {
    if (!currentListing) {
      alert("No listing selected");
      return;
    }

    setIsLoading(true);
    try {
      await placeBid({
        listingPublicKey: currentListing.publicKey,
        amount,
        offeredPrice: pricePerKg,
        options: {
          onSuccess: () => {
            alert("Bid placed successfully!");
          },
          onError: (error) => {
            alert("Failed to place bid. Check the console for details.");
            console.error("Bid error:", error);
          },
        },
      });
    } catch (error) {
      console.error("Failed to place bid:", error.message);
      alert("An unexpected error occurred while placing the bid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {oraclePrice.loading ? (
        <p className="text-center text-gray-500">Loading oracle price...</p>
      ) : oraclePrice.error ? (
        <p className="text-center text-red-500">Error loading oracle price: {oraclePrice.error}</p>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (kg)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="amount"
                min={1}
                max={maxAmount}
                step={1}
                value={[amount]}
                onValueChange={(value) => handleAmountChange(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-20"
                min={1}
                max={maxAmount}
                step={1}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Select up to {maxAmount} kg of hydrogen
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price per kg (USDC)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="price"
                min={minPrice}
                max={maxPrice}
                step={1}
                value={[pricePerKg]}
                onValueChange={(value) => setPricePerKg(value[0])}
                className="flex-1"
                disabled={minPrice === 0 && maxPrice === Infinity} // Disable until oracle price is loaded
              />
              <Input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value))}
                className="w-20"
                min={minPrice}
                max={maxPrice}
                step={1}
                disabled={minPrice === 0 && maxPrice === Infinity} // Disable until oracle price is loaded
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Bid between {minPrice} and {maxPrice} USDC/kg. Current bid is {pricePerKg} USDC/kg.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-muted">
            <div className="flex justify-between mb-1">
              <p className="text-sm">Total Bid Amount</p>
              <p className="text-sm font-bold">{totalPrice.toFixed(2)} USDC</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {amount} kg × {pricePerKg} USDC/kg
            </p>
          </div>

          <Button
            className="w-full"
            onClick={handlePlaceBid}
            disabled={isLoading || (minPrice === 0 && maxPrice === Infinity) || amount === 0}
          >
            {isLoading ? "Placing Bid..." : "Place Bid"}
          </Button>
        </>
      )}
    </div>
  );
}