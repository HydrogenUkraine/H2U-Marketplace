import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, ExternalLink } from "lucide-react"

export default function UserNFTs() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Hydrogen NFTs</CardTitle>
          <CardDescription>View and manage your hydrogen certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="owned">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="owned">Owned</TabsTrigger>
              <TabsTrigger value="produced">Produced</TabsTrigger>
            </TabsList>

            <TabsContent value="owned" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <NFTCard
                    key={i}
                    id={1000 + i}
                    amount={25 * i}
                    date="Jun 15, 2023"
                    status={i % 2 === 0 ? "in_storage" : "in_transit"}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="produced" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <NFTCard key={i} id={2000 + i} amount={50 * i} date="Jul 20, 2023" status="listed" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

function NFTCard({ id, amount, date, status }: { id: number; amount: number; date: string; status: string }) {
  return (
    <Card>
      <div className="h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-bold">
          H2
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">Hydrogen #{id}</CardTitle>
          <Badge
            variant={
              status === "in_storage"
                ? "default"
                : status === "in_transit"
                  ? "secondary"
                  : status === "listed"
                    ? "outline"
                    : "default"
            }
          >
            {status === "in_storage"
              ? "In Storage"
              : status === "in_transit"
                ? "In Transit"
                : status === "listed"
                  ? "Listed"
                  : status}
          </Badge>
        </div>
        <CardDescription>Acquired: {date}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium">{amount} kg</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 text-xs">
          <ExternalLink className="h-3 w-3 mr-1" />
          View Certificate
        </Button>
        {status === "in_storage" && <Button className="flex-1 text-xs">List on Market</Button>}
        {status === "listed" && (
          <Button className="flex-1 text-xs" variant="destructive">
            Delist
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
