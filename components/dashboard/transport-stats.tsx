"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
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
import { generateTransportStats } from "@/lib/mock/statistics"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock } from "lucide-react"

export default function TransportStats() {
  const [stats, setStats] = useState(generateTransportStats())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">Loading transport statistics...</div>
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeliveries}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageDeliveryTime} days</div>
            <p className="text-xs text-muted-foreground">-0.2 days from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">On-Time Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onTimePercentage}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Transporters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTransporters}</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="delivery" className="space-y-4">
        <TabsList>
          <TabsTrigger value="delivery">Delivery Times</TabsTrigger>
          <TabsTrigger value="volume">Transport Volume</TabsTrigger>
          <TabsTrigger value="status">Status Breakdown</TabsTrigger>
          <TabsTrigger value="transporters">Top Transporters</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Time Trends</CardTitle>
              <CardDescription>Average, fastest, and slowest delivery times over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.deliveryTimes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, "dataMax + 1"]} />
                    <Tooltip formatter={(value) => `${value} days`} />
                    <Legend />
                    <Line type="monotone" dataKey="slowestTime" name="Slowest Delivery" stroke="#ef4444" />
                    <Line
                      type="monotone"
                      dataKey="averageTime"
                      name="Average Delivery Time"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="fastestTime" name="Fastest Delivery" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Transport Routes</CardTitle>
              <CardDescription>Most frequently used hydrogen transport routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.routes.map((route, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          {route.from} to {route.to}
                        </h4>
                        <Badge variant={index === 0 ? "default" : "outline"}>{route.count} trips</Badge>
                      </div>
                      <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                        <span>Avg. Time: {route.averageTime} days</span>
                        <span>Distance: ~{Math.floor(route.averageTime * 300)} miles</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(route.count / stats.routes[0].count) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Transport Volume</CardTitle>
              <CardDescription>Hydrogen transport volume and capacity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.transportVolume} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} kg`} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="volume"
                      name="Transport Volume"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="capacity"
                      name="Total Capacity"
                      stroke="#9ca3af"
                      fill="#9ca3af"
                      fillOpacity={0.1}
                      strokeDasharray="3 3"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint</CardTitle>
              <CardDescription>Environmental impact of hydrogen transportation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-sm text-muted-foreground">Total Carbon Footprint</h4>
                  <p className="text-2xl font-bold mt-2">{stats.carbonFootprint.total} tons CO₂</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-sm text-muted-foreground">Per kg of Hydrogen</h4>
                  <p className="text-2xl font-bold mt-2">{stats.carbonFootprint.perKg} kg CO₂</p>
                  <p className="text-xs text-muted-foreground mt-1">Average emissions</p>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <h4 className="text-sm text-muted-foreground">YoY Reduction</h4>
                  <p className="text-2xl font-bold mt-2 text-green-600">
                    {stats.carbonFootprint.yearOverYearReduction}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Compared to last year</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Our platform has achieved a {stats.carbonFootprint.yearOverYearReduction}% reduction in carbon emissions
                per kg of hydrogen transported compared to last year, through route optimization and the use of
                low-emission transport vehicles.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transport Status Breakdown</CardTitle>
              <CardDescription>Current status of all hydrogen transports</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.statusBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.statusBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} transports`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0">
                <h3 className="text-lg font-medium">Transport Status</h3>
                <div className="space-y-2">
                  {stats.statusBreakdown.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{status.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{status.count}</span>
                        <span className="text-xs text-muted-foreground ml-2">({status.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Currently, {stats.statusBreakdown[1].count + stats.statusBreakdown[2].count} transports are active
                    (either in transit or awaiting pickup), representing{" "}
                    {stats.statusBreakdown[1].percentage + stats.statusBreakdown[2].percentage}% of all transports.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Deliveries</CardTitle>
              <CardDescription>Latest completed hydrogen deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentDeliveries.slice(0, 5).map((delivery, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Delivery #{delivery.id}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>
                            {delivery.origin} to {delivery.destination}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{delivery.amount} kg</p>
                      <div className="flex items-center text-xs text-muted-foreground justify-end">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{delivery.deliveryTime} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transporters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Hydrogen Transporters</CardTitle>
              <CardDescription>Highest performing transporters by delivery count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.topTransporters.map((transporter, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900 dark:text-orange-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{transporter.name}</h4>
                        <Badge variant={index === 0 ? "default" : "outline"}>{transporter.deliveries} deliveries</Badge>
                      </div>
                      <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                        <span>Avg. Time: {transporter.averageTime} days</span>
                        <span>On-Time: {transporter.onTimePercentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(transporter.deliveries / stats.topTransporters[0].deliveries) * 100}%` }}
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
