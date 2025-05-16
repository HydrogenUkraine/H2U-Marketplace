"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useMarketplace } from "@/hooks/marketplace.hooks";

interface BidPageProps {
  amount: number; // Initial amount in kg
  pricePerKg: number; // Initial price per kg in SOL
}

export default function BidForm({ props }: { props: BidPageProps }) {
  const { currentListing, placeBid } = useMarketplace();
  const { amount: maxAmount, pricePerKg: initialPrice } = props;
  const [amount, setAmount] = useState(Math.min(maxAmount, 1)); // Default to 1 kg or max
  const [pricePerKg, setPricePerKg] = useState(initialPrice);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = amount * pricePerKg;

  // Ensure amount doesn't exceed maxAmount
  const handleAmountChange = (value: number) => {
    setAmount(Math.min(value, maxAmount));
  };

  // Dynamic slider ranges
  const maxPrice = initialPrice * 2; // Allow bidding up to 2x initial price
  const minPrice = initialPrice; // Minimum bid is the listing price

  const handlePlaceBid = async () => {
    if (!currentListing) {
      alert("No listing selected");
      return;
    }

    setIsLoading(true);
    try {
      placeBid({
        listingPublicKey: currentListing.publicKey,
        amount,
        offeredPrice: pricePerKg,
        options: {
          onSuccess: () => {
          },
          onError: (error) => {
          }
        }
      });
    } catch (error) {
      console.error("Failed to place bid:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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
        <Label htmlFor="price">Price per kg (SOL)</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="price"
            min={minPrice}
            max={maxPrice}
            step={0.1}
            value={[pricePerKg]}
            onValueChange={(value) => setPricePerKg(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(Number(e.target.value))}
            className="w-20"
            min={minPrice}
            max={maxPrice}
            step={0.1}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Minimum bid is {minPrice} SOL/kg. Current highest bid is {pricePerKg} SOL/kg.
        </p>
      </div>

      <div className="p-3 rounded-lg bg-muted">
        <div className="flex justify-between mb-1">
          <p className="text-sm">Total Bid Amount</p>
          <p className="text-sm font-bold">{totalPrice.toFixed(2)} SOL</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {amount} kg × {pricePerKg} SOL/kg
        </p>
      </div>

      <Button className="w-full" onClick={handlePlaceBid} disabled={isLoading}>
        {isLoading ? "Placing Bid..." : "Place Bid"}
      </Button>
    </div>
  );
}