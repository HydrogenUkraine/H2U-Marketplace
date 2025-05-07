"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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
import { generateProductionStats } from "@/lib/mock/statistics"
import { Badge } from "@/components/ui/badge"

export default function ProductionStats() {
  const [stats, setStats] = useState(generateProductionStats())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-[400px] flex items-center justify-center">Loading production statistics...</div>
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Producers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducers}</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProduction} kg</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Production Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageProductionCost}/kg</div>
            <p className="text-xs text-muted-foreground">-2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Green Certified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certifiedGreenPercentage}%</div>
            <p className="text-xs text-muted-foreground">Of total production</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Production</TabsTrigger>
          <TabsTrigger value="sources">Energy Sources</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="producers">Top Producers</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Production & Consumption</CardTitle>
              <CardDescription>Hydrogen production and consumption over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="production" name="Production (kg)" fill="#3b82f6" />
                    <Bar yAxisId="right" dataKey="consumption" name="Consumption (kg)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Sources</CardTitle>
              <CardDescription>Breakdown of energy sources used for hydrogen production</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.energySources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.energySources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0">
                <h3 className="text-lg font-medium">Energy Source Distribution</h3>
                <div className="space-y-2">
                  {stats.energySources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{source.source}</span>
                      </div>
                      <span className="font-medium">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    All hydrogen produced on our platform is certified green, with {stats.energySources[0].source} being
                    the primary energy source at {stats.energySources[0].percentage}% of total production.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Efficiency</CardTitle>
              <CardDescription>Efficiency metrics and comparisons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Average Efficiency</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-primary h-4 rounded-full"
                          style={{ width: `${stats.efficiencyMetrics.averageEfficiency}%` }}
                        />
                      </div>
                      <span className="ml-2 font-bold">{stats.efficiencyMetrics.averageEfficiency}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Industry Average: {stats.efficiencyMetrics.industryAverage}%</span>
                      <span>+{stats.efficiencyMetrics.yearOverYearImprovement}% YoY</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Best Performing Producer</h4>
                    <div className="mt-2">
                      <p className="font-bold">{stats.efficiencyMetrics.bestProducer.name}</p>
                      <p className="text-sm">Efficiency: {stats.efficiencyMetrics.bestProducer.efficiency}%</p>
                      <p className="text-sm text-muted-foreground">
                        Location: {stats.efficiencyMetrics.bestProducer.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Production Forecast</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.forecast} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="projected" name="Projected Production" stroke="#3b82f6" />
                        <Line
                          type="monotone"
                          dataKey="capacity"
                          name="Maximum Capacity"
                          stroke="#9ca3af"
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="producers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Hydrogen Producers</CardTitle>
              <CardDescription>Highest performing producers by volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.topProducers.map((producer, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{producer.name}</h4>
                        <Badge variant={index === 0 ? "default" : "outline"}>{producer.production} kg</Badge>
                      </div>
                      <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                        <span>Efficiency: {producer.efficiency}%</span>
                        <span>Location: {producer.location}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(producer.production / stats.topProducers[0].production) * 100}%` }}
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
