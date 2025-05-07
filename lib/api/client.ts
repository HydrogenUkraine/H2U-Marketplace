/**
 * API client for interacting with the Hydrogen Marketplace API
 */

import type {
  User,
  EnergyAttributeCertificate,
  H2ProduceCertificate,
  H2MarketLot,
  Bid,
  H2BuyCertificate,
  TransportRecord,
  GlobalStats,
} from "@/lib/types"

// API base URL - can be overridden with environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.h2marketplace.com/v1"

// Default headers for all requests
const defaultHeaders = {
  "Content-Type": "application/json",
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`)
  }
  return response.json() as Promise<T>
}

// Helper function to add authorization header if token exists
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  return token ? { ...defaultHeaders, Authorization: `Bearer ${token}` } : defaultHeaders
}

// Generic fetch function with authorization and error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = getAuthHeaders()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  return handleResponse<T>(response)
}

// User API endpoints
export const userApi = {
  getAll: () => fetchApi<User[]>("/users"),
  getById: (id: string) => fetchApi<User>(`/users/${id}`),
  create: (data: Omit<User, "id" | "createdAt">) =>
    fetchApi<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getCurrentUser: () => fetchApi<User>("/users/me"),
}

// Energy Certificate API endpoints
export const energyCertificateApi = {
  getAll: () => fetchApi<EnergyAttributeCertificate[]>("/energy-certificates"),
  getById: (id: string) => fetchApi<EnergyAttributeCertificate>(`/energy-certificates/${id}`),
  create: (data: Omit<EnergyAttributeCertificate, "id" | "createdAt" | "burned">) =>
    fetchApi<EnergyAttributeCertificate>("/energy-certificates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  burnCertificate: (id: string) =>
    fetchApi<EnergyAttributeCertificate>(`/energy-certificates/${id}/burn`, {
      method: "POST",
    }),
  getByProducer: (producerId: string) =>
    fetchApi<EnergyAttributeCertificate[]>(`/energy-certificates?producerId=${producerId}`),
}

// Hydrogen Production Certificate API endpoints
export const h2CertificateApi = {
  getAll: () => fetchApi<H2ProduceCertificate[]>("/h2-certificates"),
  getById: (id: string) => fetchApi<H2ProduceCertificate>(`/h2-certificates/${id}`),
  create: (data: Omit<H2ProduceCertificate, "id" | "createdAt" | "status">) =>
    fetchApi<H2ProduceCertificate>("/h2-certificates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getByProducer: (producerId: string) => fetchApi<H2ProduceCertificate[]>(`/h2-certificates?producerId=${producerId}`),
  getByUser: (userId: string) => fetchApi<H2ProduceCertificate[]>(`/h2-certificates?userId=${userId}`),
  updateStatus: (id: string, status: H2ProduceCertificate["status"]) =>
    fetchApi<H2ProduceCertificate>(`/h2-certificates/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
}

// Marketplace API endpoints
export const marketplaceApi = {
  getAll: (filters?: Record<string, string>) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : ""
    return fetchApi<H2MarketLot[]>(`/marketplace${queryParams}`)
  },
  getById: (id: string) => fetchApi<H2MarketLot>(`/marketplace/${id}`),
  create: (data: Omit<H2MarketLot, "id" | "createdAt" | "status" | "highestBid" | "totalBids">) =>
    fetchApi<H2MarketLot>("/marketplace", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getActive: () => fetchApi<H2MarketLot[]>("/marketplace?status=active"),
  getEnding: () => fetchApi<H2MarketLot[]>("/marketplace?status=active&sort=expiresAt&limit=10"),
  getNew: () => fetchApi<H2MarketLot[]>("/marketplace?status=active&sort=-createdAt&limit=10"),
}

// Bid API endpoints
export const bidApi = {
  getAll: () => fetchApi<Bid[]>("/bids"),
  getByLot: (lotId: string) => fetchApi<Bid[]>(`/bids/${lotId}`),
  create: (data: Omit<Bid, "id" | "createdAt" | "status" | "bidderName" | "totalPrice">) =>
    fetchApi<Bid>("/bids", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  acceptBid: (id: string) =>
    fetchApi<Bid>(`/bids/${id}/accept`, {
      method: "POST",
    }),
  rejectBid: (id: string) =>
    fetchApi<Bid>(`/bids/${id}/reject`, {
      method: "POST",
    }),
}

// Buy Certificate API endpoints
export const buyCertificateApi = {
  getAll: () => fetchApi<H2BuyCertificate[]>("/buy-certificates"),
  getById: (id: string) => fetchApi<H2BuyCertificate>(`/buy-certificates/${id}`),
  create: (data: Omit<H2BuyCertificate, "id" | "createdAt" | "transportStatus">) =>
    fetchApi<H2BuyCertificate>("/buy-certificates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getByBuyer: (buyerId: string) => fetchApi<H2BuyCertificate[]>(`/buy-certificates?buyerId=${buyerId}`),
  updateTransportStatus: (id: string, status: H2BuyCertificate["transportStatus"]) =>
    fetchApi<H2BuyCertificate>(`/buy-certificates/${id}/transport-status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
}

// Transport API endpoints
export const transportApi = {
  getAll: () => fetchApi<TransportRecord[]>("/transports"),
  getById: (id: string) => fetchApi<TransportRecord>(`/transports/${id}`),
  create: (data: Omit<TransportRecord, "id" | "steps" | "transporterName">) =>
    fetchApi<TransportRecord>("/transports", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateStatus: (id: string, status: TransportRecord["status"], location?: string) =>
    fetchApi<TransportRecord>(`/transports/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, currentLocation: location }),
    }),
  getByTransporter: (transporterId: string) =>
    fetchApi<TransportRecord[]>(`/transports?transporterId=${transporterId}`),
  getByBuyer: (buyerId: string) => fetchApi<TransportRecord[]>(`/transports?buyerId=${buyerId}`),
  getActive: () => fetchApi<TransportRecord[]>(`/transports?status=in_transit,awaiting`),
}

// Statistics API endpoints
export const statsApi = {
  getGlobal: () => fetchApi<GlobalStats>("/stats"),
  getProductionTrends: () => fetchApi<GlobalStats["monthlyProduction"]>("/stats/production"),
  getMarketActivity: () => fetchApi<GlobalStats["recentActivity"]>("/stats/activity"),
}

// Authentication API endpoints
export const authApi = {
  login: (walletAddress: string, signature: string) =>
    fetchApi<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ walletAddress, signature }),
    }),
  logout: () =>
    fetchApi<{ success: boolean }>("/auth/logout", {
      method: "POST",
    }),
  verifyToken: () => fetchApi<{ valid: boolean; user?: User }>("/auth/verify"),
}
