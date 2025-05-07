import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function BidHistory() {
  const bids = [
    { id: 1, bidder: "Buyer #3045", amount: 25, price: 15, time: "2 hours ago", status: "highest" },
    { id: 2, bidder: "Buyer #2789", amount: 15, price: 14.5, time: "5 hours ago", status: "outbid" },
    { id: 3, bidder: "Buyer #4102", amount: 30, price: 13, time: "1 day ago", status: "outbid" },
    { id: 4, bidder: "Buyer #1567", amount: 10, price: 12.5, time: "1 day ago", status: "outbid" },
    { id: 5, bidder: "Buyer #3045", amount: 20, price: 12, time: "2 days ago", status: "outbid" },
    { id: 6, bidder: "Buyer #2789", amount: 15, price: 11, time: "2 days ago", status: "outbid" },
    { id: 7, bidder: "Buyer #4102", amount: 10, price: 10, time: "3 days ago", status: "outbid" },
  ]

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div key={bid.id} className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-primary/10 text-primary">{bid.bidder.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{bid.bidder}</p>
              <p className="text-xs text-muted-foreground">{bid.time}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center">
              <p className="text-sm font-medium">{bid.price} per kg</p>
              {bid.status === "highest" && (
                <Badge variant="default" className="ml-2">
                  Highest
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {bid.amount} kg ({(bid.amount * bid.price).toFixed(2)} total)
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
