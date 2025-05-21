'use client'
import { Suspense, useEffect, useState } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import MarketplaceSkeleton from "@/components/marketplace/marketplace-skeleton"
import { useH2IotData } from "@/hooks/iot.data.hooks"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useMarketplace } from "@/hooks/marketplace.hooks"
import { marketplaceAtom } from "@/lib/jotai/marketplace-actions"
import { Spinner } from "@/components/ui/spinner"

export default function MarketplacePage() {
  const {marketplaceListings, fetchMarketplaceListings} = useMarketplace();

  useEffect(() => {
      fetchMarketplaceListings();
  }, [fetchMarketplaceListings]);


  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Hydrogen Marketplace</h1>
            <p className="text-muted-foreground mt-1">Browse and bid on available hydrogen NFT lots</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input placeholder="Search lots..." className="pl-8" />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All Lots</TabsTrigger>
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="ending">Ending Soon</TabsTrigger>
            <TabsTrigger value="new">Newly Listed</TabsTrigger>
          </TabsList>

          <Suspense fallback={<MarketplaceSkeleton />}>
            <TabsContent value="all" className="mt-6">
              <div className="">
                {marketplaceListings.loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Spinner className="h-8 w-8" />
                    <span className="ml-2 text-sm text-muted-foreground">Loading listings...</span>
                  </div>
                ) : marketplaceListings.data.length === 0 ? (
                  <p className="text-muted-foreground">No listings available</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketplaceListings.data.map((lot, index) => (
                      <MarketplaceCard key={lot.publicKey} id={index} lot={lot} />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <MarketplaceCard key={i} id={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <MarketplaceCard key={i} id={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <MarketplaceCard key={i} id={i} />
                ))}
              </div>
            </TabsContent> */}
          </Suspense>
        </Tabs>
      </div>
    </AuthGuard>
  )
}

function MarketplaceCard({ id, lot}: { id: number, lot: any}) {
  const { setCurrentListing } = useMarketplace();

  const handleViewDetails = () => {
    setCurrentListing(lot);
  };

  const amountKg = lot.amount / 1e9;

  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500/20 to-green-500/20 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-xl">
          H2
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Hydrogen Lot #{lot.batchId}</CardTitle>
          <Badge variant="default">Available</Badge>
        </div>
        <CardDescription>Producer : 
        <Link href={`https://explorer.solana.com/address/${lot.producer}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline">
              Account
            </Link>
        </CardDescription> 
        {/* {lot.producer.slice(0, 8)}... */}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium">{amountKg} kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-medium">{lot.price} USDC/kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Market Guardian</p>
            <Link href={`https://explorer.solana.com/address/${lot.transferManagerAta}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline">
              See in Solana Explorer
            </Link>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">H2 NFT</p>
            <Link href={`https://explorer.solana.com/address/${lot.tokenMint}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline">
              See in Solana Explorer
            </Link>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Time Remaining</p>
            <p className="font-medium">{id % 3 === 0 ? '2 hours' : `${id + 1} days`}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bids</p>
            <p className="font-medium">{id * 2 + 3}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1" onClick={handleViewDetails}>
          <Link href={`/marketplace/${lot.publicKey}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          Place Bid
        </Button>
      </CardFooter>
    </Card>
  )
}
