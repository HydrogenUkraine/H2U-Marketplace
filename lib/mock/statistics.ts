/**
 * Mock data generators for statistics
 */
import { addDays, format, subDays, subMonths } from "date-fns"

// Production Statistics
export const generateProductionStats = () => {
  // Monthly production data for the past 12 months
  const monthlyData = Array.from({ length: 12 }).map((_, i) => {
    const date = subMonths(new Date(), 11 - i)
    const baseProduction = 200 + Math.floor(Math.random() * 200)
    const growthFactor = 1 + i * 0.05

    return {
      month: format(date, "MMM"),
      production: Math.floor(baseProduction * growthFactor),
      consumption: Math.floor(baseProduction * growthFactor * (0.6 + Math.random() * 0.2)),
      year: format(date, "yyyy"),
    }
  })

  // Energy sources breakdown
  const energySources = [
    { source: "Solar", percentage: 45 },
    { source: "Wind", percentage: 30 },
    { source: "Hydro", percentage: 15 },
    { source: "Geothermal", percentage: 10 },
  ]

  // Efficiency metrics
  const efficiencyMetrics = {
    averageEfficiency: 68 + Math.floor(Math.random() * 10),
    bestProducer: {
      name: "SolarHydro Inc.",
      efficiency: 78 + Math.floor(Math.random() * 5),
      location: "Arizona, USA",
    },
    industryAverage: 65,
    yearOverYearImprovement: 4.2 + (Math.random() * 2).toFixed(1),
  }

  // Top producers
  const topProducers = Array.from({ length: 5 }).map((_, i) => ({
    id: `producer-${1000 + i}`,
    name: `Producer #${1000 + i}`,
    production: 120 - i * 15,
    efficiency: 75 - i * 2,
    location: ["California", "Texas", "Nevada", "Arizona", "New Mexico"][i],
  }))

  // Production forecast
  const forecast = Array.from({ length: 6 }).map((_, i) => {
    const date = addDays(new Date(), i * 30)
    const baseProduction = 300 + Math.floor(Math.random() * 100)
    const seasonalFactor = 1 + Math.sin(i / 2) * 0.2

    return {
      month: format(date, "MMM"),
      projected: Math.floor(baseProduction * seasonalFactor),
      capacity: Math.floor(baseProduction * seasonalFactor * 1.3),
    }
  })

  return {
    monthlyData,
    energySources,
    efficiencyMetrics,
    topProducers,
    forecast,
    totalProducers: 42,
    totalProduction: 3245,
    averageProductionCost: 8.75,
    certifiedGreenPercentage: 92,
  }
}

// Market Statistics
export const generateMarketStats = () => {
  // Price trends over time
  const priceTrends = Array.from({ length: 12 }).map((_, i) => {
    const date = subMonths(new Date(), 11 - i)
    const basePrice = 10 + i * 0.5
    const volatility = Math.random() * 2 - 1

    return {
      month: format(date, "MMM"),
      avgPrice: +(basePrice + volatility).toFixed(2),
      highPrice: +(basePrice + 2 + volatility).toFixed(2),
      lowPrice: +(basePrice - 1 + volatility).toFixed(2),
      volume: Math.floor(100 + i * 20 + Math.random() * 50),
    }
  })

  // Recent transactions
  const transactionTypes = ["New Listing", "Completed Sale", "Auction Ended", "Buyout Purchase"]
  const recentTransactions = Array.from({ length: 10 })
    .map((_, i) => {
      const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
      const amount = 5 + Math.floor(Math.random() * 45)
      const price = 10 + Math.floor(Math.random() * 10) + Math.random().toFixed(2)
      const hoursAgo = Math.floor(Math.random() * 24)

      return {
        id: `transaction-${1000 + i}`,
        type,
        amount,
        price: +price,
        total: +(amount * price).toFixed(2),
        timestamp: subDays(new Date(), hoursAgo / 24),
        hoursAgo,
        buyer:
          type.includes("Sale") || type.includes("Purchase")
            ? `Buyer #${2000 + Math.floor(Math.random() * 100)}`
            : null,
        seller: `Producer #${1000 + Math.floor(Math.random() * 100)}`,
      }
    })
    .sort((a, b) => a.hoursAgo - b.hoursAgo)

  // Market volume by region
  const regionVolume = [
    { region: "North America", volume: 425, percentage: 42 },
    { region: "Europe", volume: 320, percentage: 32 },
    { region: "Asia", volume: 180, percentage: 18 },
    { region: "Rest of World", volume: 80, percentage: 8 },
  ]

  // Bid-ask spread over time
  const bidAskSpread = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i)
    const baseAsk = 12 + i * 0.1
    const baseBid = baseAsk - 1 - Math.random() * 0.5

    return {
      date: format(date, "dd MMM"),
      ask: +baseAsk.toFixed(2),
      bid: +baseBid.toFixed(2),
      spread: +(baseAsk - baseBid).toFixed(2),
    }
  })

  // Top buyers
  const topBuyers = Array.from({ length: 5 }).map((_, i) => ({
    id: `buyer-${2000 + i}`,
    name: `Buyer #${2000 + i}`,
    volumePurchased: 100 - i * 15,
    averagePrice: +(12 - i * 0.3).toFixed(2),
    totalSpent: +((100 - i * 15) * (12 - i * 0.3)).toFixed(2),
  }))

  return {
    priceTrends,
    recentTransactions,
    regionVolume,
    bidAskSpread,
    topBuyers,
    totalVolume: 1005,
    averagePrice: 12.75,
    highestSale: {
      amount: 75,
      price: 15.25,
      total: 1143.75,
      date: subDays(new Date(), 3),
    },
    activeLots: 28,
    averageBidCount: 4.2,
  }
}

// Transport Statistics
export const generateTransportStats = () => {
  // Delivery times
  const deliveryTimes = Array.from({ length: 12 }).map((_, i) => {
    const date = subMonths(new Date(), 11 - i)
    const baseTime = 3 + Math.random() * 0.5
    const improvementFactor = Math.max(0.8, 1 - i * 0.02)

    return {
      month: format(date, "MMM"),
      averageTime: +(baseTime * improvementFactor).toFixed(1),
      fastestTime: +(baseTime * improvementFactor - 1 - Math.random() * 0.5).toFixed(1),
      slowestTime: +(baseTime * improvementFactor + 2 + Math.random() * 1).toFixed(1),
    }
  })

  // Transport volume over time
  const transportVolume = Array.from({ length: 12 }).map((_, i) => {
    const date = subMonths(new Date(), 11 - i)
    const baseVolume = 50 + i * 10
    const seasonalFactor = 1 + Math.sin(i / 2) * 0.2

    return {
      month: format(date, "MMM"),
      volume: Math.floor(baseVolume * seasonalFactor),
      capacity: Math.floor(baseVolume * seasonalFactor * 1.5),
    }
  })

  // Transport status breakdown
  const statusBreakdown = [
    { status: "Delivered", count: 156, percentage: 65 },
    { status: "In Transit", count: 48, percentage: 20 },
    { status: "Awaiting Pickup", count: 36, percentage: 15 },
  ]

  // Transport routes
  const routes = [
    { from: "California", to: "Nevada", count: 45, averageTime: 1.5 },
    { from: "Texas", to: "Arizona", count: 38, averageTime: 2.1 },
    { from: "Nevada", to: "Utah", count: 32, averageTime: 1.8 },
    { from: "Arizona", to: "New Mexico", count: 28, averageTime: 2.3 },
    { from: "Oregon", to: "Washington", count: 25, averageTime: 1.2 },
  ]

  // Top transporters
  const topTransporters = Array.from({ length: 5 }).map((_, i) => ({
    id: `transporter-${3000 + i}`,
    name: `Transporter #${3000 + i}`,
    deliveries: 80 - i * 12,
    averageTime: +(2 + i * 0.2).toFixed(1),
    onTimePercentage: 98 - i * 2,
  }))

  // Recent deliveries
  const recentDeliveries = Array.from({ length: 8 })
    .map((_, i) => {
      const daysAgo = Math.floor(Math.random() * 7)
      const amount = 10 + Math.floor(Math.random() * 40)

      return {
        id: `delivery-${1000 + i}`,
        transporterId: `transporter-${3000 + Math.floor(Math.random() * 10)}`,
        transporterName: `Transporter #${3000 + Math.floor(Math.random() * 10)}`,
        origin: ["California", "Texas", "Nevada", "Arizona", "Oregon"][Math.floor(Math.random() * 5)],
        destination: ["Nevada", "Utah", "Arizona", "New Mexico", "Washington"][Math.floor(Math.random() * 5)],
        amount,
        deliveryTime: 1 + Math.floor(Math.random() * 3) + Math.random().toFixed(1),
        completedAt: subDays(new Date(), daysAgo),
        daysAgo,
      }
    })
    .sort((a, b) => a.daysAgo - b.daysAgo)

  return {
    deliveryTimes,
    transportVolume,
    statusBreakdown,
    routes,
    topTransporters,
    recentDeliveries,
    totalDeliveries: 240,
    averageDeliveryTime: 2.3,
    onTimePercentage: 94,
    activeTransporters: 18,
    carbonFootprint: {
      total: 125,
      perKg: 0.12,
      yearOverYearReduction: 8.5,
    },
  }
}
