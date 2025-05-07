"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { generateMarketStats } from "@/lib/mock/statistics"
import { Badge } from "@/components/ui/badge"

export default function MarketStats() {
  const [stats, setStats] = useState(generateMarketStats())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">Loading market statistics...</div>
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Market Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVolume} kg</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averagePrice}/kg</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Lots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLots}</div>
            <p className="text-xs text-muted-foreground">Avg. {stats.averageBidCount} bids per lot</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.highestSale.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.highestSale.amount} kg at ${stats.highestSale.price}/kg
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="price" className="space-y-4">
        <TabsList>
          <TabsTrigger value="price">Price Trends</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="regions">Regional Data</TabsTrigger>
          <TabsTrigger value="buyers">Top Buyers</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hydrogen Price Trends</CardTitle>
              <CardDescription>Average price per kg over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.priceTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="highPrice" name="High Price" stroke="#ef4444" />
                    <Line type="monotone" dataKey="avgPrice" name="Average Price" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="lowPrice" name="Low Price" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bid-Ask Spread</CardTitle>
              <CardDescription>Difference between highest bid and lowest ask prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.bidAskSpread} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="ask"
                      name="Ask Price"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.1}
                    />
                    <Area
                      type="monotone"
                      dataKey="bid"
                      name="Bid Price"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Market Activity</CardTitle>
              <CardDescription>Latest transactions on the hydrogen marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentTransactions.slice(0, 7).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                          transaction.type === "New Listing"
                            ? "bg-blue-500"
                            : transaction.type === "Completed Sale"
                              ? "bg-green-500"
                              : transaction.type === "Auction Ended"
                                ? "bg-yellow-500"
                                : "bg-purple-500"
                        }`}
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {transaction.type} #{transaction.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.amount} kg at ${transaction.price}/kg
                          {transaction.buyer && ` • ${transaction.buyer}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${transaction.total}</p>
                      <p className="text-xs text-muted-foreground">{transaction.hoursAgo}h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Monthly transaction volume over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.priceTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volume" name="Transaction Volume (kg)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Volume by Region</CardTitle>
              <CardDescription>Distribution of hydrogen trading across regions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.regionVolume}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="volume"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.regionVolume.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} kg`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0">
                <h3 className="text-lg font-medium">Regional Distribution</h3>
                <div className="space-y-2">
                  {stats.regionVolume.map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{region.region}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{region.volume} kg</span>
                        <span className="text-xs text-muted-foreground ml-2">({region.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    North America and Europe account for{" "}
                    {stats.regionVolume[0].percentage + stats.regionVolume[1].percentage}% of the global hydrogen market
                    volume, with Asia showing the fastest growth rate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buyers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Hydrogen Buyers</CardTitle>
              <CardDescription>Highest volume buyers in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.topBuyers.map((buyer, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{buyer.name}</h4>
                        <Badge variant={index === 0 ? "default" : "outline"}>{buyer.volumePurchased} kg</Badge>
                      </div>
                      <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                        <span>Avg. Price: ${buyer.averagePrice}/kg</span>
                        <span>Total: ${buyer.totalSpent}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(buyer.volumePurchased / stats.topBuyers[0].volumePurchased) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
