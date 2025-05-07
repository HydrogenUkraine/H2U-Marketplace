import { Suspense } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import MarketplaceSkeleton from "@/components/marketplace/marketplace-skeleton"

export default function MarketplacePage() {
  return (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <MarketplaceCard key={i} id={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
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
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  )
}

function MarketplaceCard({ id }: { id: number }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500/20 to-green-500/20 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-xl">
          H2
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Hydrogen Lot #{1000 + id}</CardTitle>
          <Badge variant={id % 3 === 0 ? "destructive" : "default"}>{id % 3 === 0 ? "Ending Soon" : "Active"}</Badge>
        </div>
        <CardDescription>Producer: Green Energy #{2000 + id}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium">{25 + id * 5} kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Starting Bid</p>
            <p className="font-medium">{10 + (id % 5)} per kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Bid</p>
            <p className="font-medium">{12 + (id % 7)} per kg</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Buyout Price</p>
            <p className="font-medium">{20 + (id % 10)} per kg</p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Time Remaining</p>
            <p className="font-medium">{id % 3 === 0 ? "2 hours" : `${id + 1} days`}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bids</p>
            <p className="font-medium">{id * 2 + 3}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/marketplace/${1000 + id}`}>View Details</Link>
        </Button>
        <Button variant="outline" className="flex-1">
          Place Bid
        </Button>
      </CardFooter>
    </Card>
  )
}
