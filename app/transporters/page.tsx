import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, MapPin, Search, Truck } from "lucide-react"
import Link from "next/link"
import TransporterMap from "@/components/transporters/transporter-map"

export default function TransportersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hydrogen Transport</h1>
          <p className="text-muted-foreground mt-1">Track your hydrogen deliveries and find transporters</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input placeholder="Search transporters..." className="pl-8" />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="active">Active Transports</TabsTrigger>
          <TabsTrigger value="transporters">Find Transporters</TabsTrigger>
          <TabsTrigger value="history">Transport History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transport Map</CardTitle>
              <CardDescription>Real-time view of your active hydrogen transports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md overflow-hidden mb-6">
                <TransporterMap />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Active Transports</h3>

                {[1, 2].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                            <Truck className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Transport #{1000 + i}</h4>
                            <p className="text-sm text-muted-foreground">
                              {i === 1 ? "In Transit • 2 days remaining" : "Awaiting Pickup • Scheduled for tomorrow"}
                            </p>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                {i === 1 ? "Highway 101, Mile 45" : "Green Energy Plant #2045"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                          <Badge variant={i === 1 ? "secondary" : "outline"}>
                            {i === 1 ? "In Transit" : "Awaiting"}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/profile?tab=transport`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transporters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Transporters</CardTitle>
              <CardDescription>Find and contact hydrogen transporters for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Transporter #{3000 + i}</h4>
                          <p className="text-sm text-muted-foreground">
                            {i % 2 === 0 ? "H2 Logistics Inc." : "EcoTransport Solutions"}
                          </p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs mr-2">
                              {i % 3 === 0 ? "Long Distance" : i % 3 === 1 ? "Regional" : "Local"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {i % 2 === 0 ? "Available" : "Busy"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{i * 10 + 50} successful deliveries</p>
                          <Button variant="outline" size="sm" className="mt-2 w-full">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transport History</CardTitle>
              <CardDescription>View your past hydrogen transports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">Transport #{900 + i}</h4>
                      <p className="text-sm text-muted-foreground">
                        {25 + i * 5} kg • Completed on May {10 + i}, 2023
                      </p>
                      <div className="flex items-center mt-1">
                        <Truck className="h-3 w-3 mr-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Transporter #{3000 + i}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      View Details
                    </Button>
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
