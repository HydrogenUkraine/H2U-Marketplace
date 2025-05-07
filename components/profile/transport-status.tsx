import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Truck, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react"

export default function TransportStatus() {
  const transports = [
    {
      id: 1,
      lotId: 1001,
      amount: 25,
      status: "delivered",
      startDate: "Jun 15, 2023",
      deliveryDate: "Jun 18, 2023",
      transporter: "Fast H2 Transport #3001",
      origin: "Green Energy Plant #2045",
      destination: "Your Storage Facility",
      steps: [
        { name: "Order Placed", date: "Jun 15, 2023", completed: true },
        { name: "Pickup Scheduled", date: "Jun 16, 2023", completed: true },
        { name: "In Transit", date: "Jun 17, 2023", completed: true },
        { name: "Delivered", date: "Jun 18, 2023", completed: true },
      ],
    },
    {
      id: 2,
      lotId: 1003,
      amount: 50,
      status: "in_transit",
      startDate: "Jul 10, 2023",
      deliveryDate: "Jul 13, 2023",
      transporter: "H2 Logistics #3005",
      origin: "Solar Hydrogen Inc #2078",
      destination: "Your Storage Facility",
      currentLocation: "Highway 101, Mile 45",
      steps: [
        { name: "Order Placed", date: "Jul 10, 2023", completed: true },
        { name: "Pickup Scheduled", date: "Jul 11, 2023", completed: true },
        { name: "In Transit", date: "Jul 12, 2023", completed: true },
        { name: "Delivered", date: "Jul 13, 2023", completed: false },
      ],
    },
    {
      id: 3,
      lotId: 1005,
      amount: 35,
      status: "awaiting",
      startDate: "Jul 20, 2023",
      deliveryDate: "Jul 23, 2023",
      transporter: "EcoH2 Transport #3012",
      origin: "Wind Power H2 #2092",
      destination: "Your Storage Facility",
      steps: [
        { name: "Order Placed", date: "Jul 20, 2023", completed: true },
        { name: "Pickup Scheduled", date: "Jul 21, 2023", completed: false },
        { name: "In Transit", date: "Jul 22, 2023", completed: false },
        { name: "Delivered", date: "Jul 23, 2023", completed: false },
      ],
    },
  ]

  return (
    <>
      {transports.map((transport) => (
        <Card key={transport.id} className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>
                  Transport #{transport.id} - Lot #{transport.lotId}
                </CardTitle>
                <CardDescription>
                  {transport.amount} kg of hydrogen • {transport.startDate}
                </CardDescription>
              </div>
              <Badge
                variant={
                  transport.status === "delivered"
                    ? "default"
                    : transport.status === "in_transit"
                      ? "secondary"
                      : "outline"
                }
                className="mt-2 md:mt-0"
              >
                {transport.status === "delivered"
                  ? "Delivered"
                  : transport.status === "in_transit"
                    ? "In Transit"
                    : "Awaiting Transport"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Transporter</p>
                    <p className="font-medium">{transport.transporter}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-medium">{transport.origin}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{transport.destination}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{transport.startDate}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">{transport.deliveryDate}</p>
                  </div>
                </div>

                {transport.status === "in_transit" && transport.currentLocation && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium">{transport.currentLocation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-semibold mb-4">Transport Progress</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-muted" />
                <div className="space-y-6">
                  {transport.steps.map((step, index) => (
                    <div key={index} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-background" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {transport.status !== "delivered" && (
              <div className="mt-6">
                <Button variant="outline">Contact Transporter</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  )
}
