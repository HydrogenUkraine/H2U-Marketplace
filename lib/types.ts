// Data models based on the reference from https://github.com/kyrylog/H2U

export interface User {
  id: string
  name: string
  email: string
  walletAddress: string
  role: "producer" | "buyer" | "transporter"
  createdAt: Date
}

export interface EnergyAttributeCertificate {
  id: string
  producerId: string
  amount: number // kWh
  source: string // e.g., "solar", "wind"
  createdAt: Date
  burned: boolean
}

export interface H2ProduceCertificate {
  id: string
  producerId: string
  amount: number // kg
  energyCertificateId: string
  createdAt: Date
  expiresAt: Date
  status: "stored" | "listed" | "sold"
}

export interface H2MarketLot {
  id: string
  produceCertificateId: string
  producerId: string
  amount: number // kg
  startingBid: number // price per kg
  buyoutPrice: number // price per kg
  createdAt: Date
  expiresAt: Date
  status: "active" | "sold" | "expired"
}

export interface Bid {
  id: string
  lotId: string
  bidderId: string
  amount: number // kg
  pricePerKg: number
  createdAt: Date
  status: "pending" | "accepted" | "rejected"
}

export interface H2BuyCertificate {
  id: string
  buyerId: string
  lotId: string
  amount: number // kg
  price: number // total price
  createdAt: Date
  transportStatus: "awaiting" | "in_transit" | "delivered"
  estimatedDelivery?: Date
}

export interface TransportRecord {
  id: string
  buyCertificateId: string
  transporterId: string
  status: "awaiting" | "in_transit" | "delivered"
  startedAt?: Date
  completedAt?: Date
  estimatedDelivery?: Date
  currentLocation?: string
}

export interface GlobalStats {
  totalHydrogenProduced: number // kg
  totalHydrogenStored: number // kg
  totalElectricityBurned: number // kWh
  activeProducers: number
  activeTransporters: number
  activeBuyers: number
  totalMarketVolume: number // in currency
}
