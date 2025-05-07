"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function BidForm() {
  const [amount, setAmount] = useState(10)
  const [pricePerKg, setPricePerKg] = useState(15)
  const totalPrice = amount * pricePerKg

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (kg)</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="amount"
            min={1}
            max={50}
            step={1}
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-20"
            min={1}
            max={50}
          />
        </div>
        <p className="text-xs text-muted-foreground">Select the amount of hydrogen you want to bid on</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price per kg</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="price"
            min={10}
            max={20}
            step={0.5}
            value={[pricePerKg]}
            onValueChange={(value) => setPricePerKg(value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(Number(e.target.value))}
            className="w-20"
            min={10}
            max={20}
            step={0.5}
          />
        </div>
        <p className="text-xs text-muted-foreground">Minimum bid is 10 per kg. Current highest bid is 15 per kg.</p>
      </div>

      <div className="p-3 rounded-lg bg-muted">
        <div className="flex justify-between mb-1">
          <p className="text-sm">Total Bid Amount</p>
          <p className="text-sm font-bold">{totalPrice.toFixed(2)}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {amount} kg × {pricePerKg} per kg
        </p>
      </div>

      <Button className="w-full">Place Bid</Button>
    </div>
  )
}
