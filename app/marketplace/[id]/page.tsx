'use client'
import { ArrowLeft, Calendar, Droplets, Factory, Timer, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BidForm from "@/components/marketplace/bid-form";
import BidHistory from "@/components/marketplace/bid-history";
import { useMarketplace } from "@/hooks/marketplace.hooks";

export default function LotDetailPage() {
  const { currentListing } = useMarketplace();
  console.log(currentListing);

  if (!currentListing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">No listing selected. Please select a listing from the marketplace.</p>
        <Link href="/marketplace" className="text-blue-600 hover:underline">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const amountKg = currentListing.amount / 1e9;
  const producerShort = `${currentListing.producer.slice(0, 4)}...${currentListing.producer.slice(-4)}`;
  const daysRemaining = 27; // Mocked (30 days from May 13, 2025)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/marketplace"
          className="flex items-center text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Hydrogen Lot #{currentListing.batchId}</h1>
            <p className="text-muted-foreground">
              Listed 3 days ago • {daysRemaining} days remaining
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Share</Button>
            <Button>Buy Now ({currentListing.price} SOL/kg)</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="h-64 bg-gradient-to-r from-blue-500/20 to-green-500/20 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-3xl">
                H2
              </div>
            </div>

            <CardHeader>
              <CardTitle>Hydrogen NFT Details</CardTitle>
              <CardDescription>
                This hydrogen lot was produced using renewable energy certificates
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Available</p>
                      <p className="font-medium">{amountKg} kg</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Factory className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Producer</p>
                      <p className="font-medium">
                        <Link
                          href={`https://explorer.solana.com/address/${currentListing.producer}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {producerShort}
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Factory className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Trasfer manager</p>
                      <p className="font-medium">
                        <Link
                          href={`https://explorer.solana.com/address/${currentListing.transferManagerAta}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View in explorer
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Timer className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Storage Remaining</p>
                      <p className="font-medium">{daysRemaining} days</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Energy Certificate</p>
                      <p className="font-medium">
                        <Link
                          href={`https://explorer.solana.com/address/${currentListing.eacMint}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          EAC #{currentListing.eacMint.slice(0, 8)}
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Production Date</p>
                      <p className="font-medium">{currentListing.productionDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold mb-2">Certificate Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This hydrogen was produced using renewable energy. The energy certificate was burned to mint this
                  hydrogen NFT, ensuring a transparent and verifiable production process.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <p className="text-sm font-medium">EAC Token Mint</p>
                    <p className="text-xs text-muted-foreground">
                      <Link
                        href={`https://explorer.solana.com/address/${currentListing.eacMint}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {currentListing.eacMint}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
              <CardDescription>View all bids placed on this hydrogen lot</CardDescription>
            </CardHeader>
            <CardContent>
              <BidHistory />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Auction Details</CardTitle>
              <CardDescription>Current status and pricing information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="default" className="mr-2">
                      Active
                    </Badge>
                    <p className="text-sm">{daysRemaining} days remaining</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Current Highest Bid</p>
                  <p className="text-2xl font-bold">{(currentListing.price).toFixed(2)} SOL/kg</p>
                  <p className="text-sm text-muted-foreground">by Buyer #{currentListing.producer.slice(0, 4)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Starting Bid</p>
                  <p className="font-medium">{(currentListing.price).toFixed(2)} SOL/kg</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Buyout Price</p>
                  <p className="font-medium">{currentListing.price} SOL/kg</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="font-medium">7 bids</p>
                </div>

                <Separator />

                <div>
                  <Button className="w-full mb-2">
                    Buy Now ({(currentListing.price * amountKg).toFixed(2)} SOL total)
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Buy the entire lot immediately at the buyout price
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Place a Bid</CardTitle>
              <CardDescription>Bid on part or all of this hydrogen lot</CardDescription>
            </CardHeader>
            <CardContent>
              <BidForm props={{amount : amountKg , pricePerKg: currentListing.price}}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}