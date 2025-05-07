import { Suspense } from "react"
import { ArrowUpRight, Droplets, Truck, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardCharts from "@/components/dashboard/dashboard-charts"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"
import ProductionStats from "@/components/dashboard/production-stats"
import MarketStats from "@/components/dashboard/market-stats"
import TransportStats from "@/components/dashboard/transport-stats"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Global Statistics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hydrogen Produced</CardTitle>
                <Droplets className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245 kg</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Electricity Burned</CardTitle>
                <Zap className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231 kWh</div>
                <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hydrogen in Storage</CardTitle>
                <Droplets className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">532 kg</div>
                <p className="text-xs text-muted-foreground">-3.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
                <Users className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hydrogen Production Overview</CardTitle>
                <CardDescription>Monthly production and consumption trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<DashboardSkeleton />}>
                  <DashboardCharts />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Market Activity</CardTitle>
                <CardDescription>Recent transactions and listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className={`mr-2 h-2 w-2 rounded-full ${i % 2 === 0 ? "bg-green-500" : "bg-blue-500"}`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i % 2 === 0 ? "New Listing" : "Completed Sale"} #{1000 + i}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i % 2 === 0 ? "25 kg at 12.5/kg" : "15 kg sold for 200"}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">{i}h ago</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/marketplace">View All Listings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Producers</CardTitle>
                <CardDescription>Top hydrogen producers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                        {i}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Producer #{1000 + i}</p>
                        <p className="text-xs text-muted-foreground">{120 - i * 20} kg produced</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Buyers</CardTitle>
                <CardDescription>Top hydrogen buyers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-400">
                        {i}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Buyer #{2000 + i}</p>
                        <p className="text-xs text-muted-foreground">{100 - i * 25} kg purchased</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Transporters</CardTitle>
                <CardDescription>Top hydrogen transporters this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Transporter #{3000 + i}</p>
                        <p className="text-xs text-muted-foreground">{80 - i * 20} kg delivered</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Suspense
            fallback={
              <div className="h-[400px] flex items-center justify-center">Loading production statistics...</div>
            }
          >
            <ProductionStats />
          </Suspense>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Suspense
            fallback={<div className="h-[400px] flex items-center justify-center">Loading market statistics...</div>}
          >
            <MarketStats />
          </Suspense>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Suspense
            fallback={<div className="h-[400px] flex items-center justify-center">Loading transport statistics...</div>}
          >
            <TransportStats />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
