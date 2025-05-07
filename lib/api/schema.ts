/**
 * OpenAPI schema for the Hydrogen Marketplace API
 * This defines the structure of our API endpoints and data models
 */

export const apiSchema = {
  openapi: "3.0.0",
  info: {
    title: "Hydrogen Marketplace API",
    version: "1.0.0",
    description: "API for the Hydrogen (H2) Marketplace platform",
  },
  servers: [
    {
      url: "https://api.h2marketplace.com/v1",
      description: "Production server",
    },
    {
      url: "https://staging-api.h2marketplace.com/v1",
      description: "Staging server",
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        responses: {
          "200": {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "User details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/energy-certificates": {
      get: {
        summary: "Get all energy certificates",
        responses: {
          "200": {
            description: "A list of energy certificates",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/EnergyAttributeCertificate",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new energy certificate",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EnergyAttributeCertificateInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Energy certificate created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EnergyAttributeCertificate",
                },
              },
            },
          },
        },
      },
    },
    "/h2-certificates": {
      get: {
        summary: "Get all hydrogen production certificates",
        responses: {
          "200": {
            description: "A list of hydrogen production certificates",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/H2ProduceCertificate",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new hydrogen production certificate",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/H2ProduceCertificateInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Hydrogen production certificate created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/H2ProduceCertificate",
                },
              },
            },
          },
        },
      },
    },
    "/marketplace": {
      get: {
        summary: "Get all marketplace lots",
        responses: {
          "200": {
            description: "A list of marketplace lots",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/H2MarketLot",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new marketplace lot",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/H2MarketLotInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Marketplace lot created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/H2MarketLot",
                },
              },
            },
          },
        },
      },
    },
    "/marketplace/{id}": {
      get: {
        summary: "Get marketplace lot by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Marketplace lot details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/H2MarketLot",
                },
              },
            },
          },
        },
      },
    },
    "/bids": {
      get: {
        summary: "Get all bids",
        responses: {
          "200": {
            description: "A list of bids",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Bid",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new bid",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BidInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Bid created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Bid",
                },
              },
            },
          },
        },
      },
    },
    "/bids/{lotId}": {
      get: {
        summary: "Get bids for a specific lot",
        parameters: [
          {
            name: "lotId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of bids for the specified lot",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Bid",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/transports": {
      get: {
        summary: "Get all transport records",
        responses: {
          "200": {
            description: "A list of transport records",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/TransportRecord",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new transport record",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransportRecordInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Transport record created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransportRecord",
                },
              },
            },
          },
        },
      },
    },
    "/transports/{id}": {
      get: {
        summary: "Get transport record by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Transport record details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransportRecord",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update transport record",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransportRecordInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Transport record updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TransportRecord",
                },
              },
            },
          },
        },
      },
    },
    "/stats": {
      get: {
        summary: "Get global statistics",
        responses: {
          "200": {
            description: "Global statistics",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GlobalStats",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          walletAddress: { type: "string" },
          role: {
            type: "string",
            enum: ["producer", "buyer", "transporter"],
          },
          createdAt: { type: "string", format: "date-time" },
          email: { type: "string" },
          company: { type: "string" },
          bio: { type: "string" },
          profileImage: { type: "string" },
        },
        required: ["id", "name", "walletAddress", "role", "createdAt"],
      },
      UserInput: {
        type: "object",
        properties: {
          name: { type: "string" },
          walletAddress: { type: "string" },
          role: {
            type: "string",
            enum: ["producer", "buyer", "transporter"],
          },
          email: { type: "string" },
          company: { type: "string" },
          bio: { type: "string" },
          profileImage: { type: "string" },
        },
        required: ["name", "walletAddress", "role"],
      },
      EnergyAttributeCertificate: {
        type: "object",
        properties: {
          id: { type: "string" },
          producerId: { type: "string" },
          amount: { type: "number" },
          source: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          burned: { type: "boolean" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["id", "producerId", "amount", "source", "createdAt", "burned"],
      },
      EnergyAttributeCertificateInput: {
        type: "object",
        properties: {
          producerId: { type: "string" },
          amount: { type: "number" },
          source: { type: "string" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["producerId", "amount", "source"],
      },
      H2ProduceCertificate: {
        type: "object",
        properties: {
          id: { type: "string" },
          producerId: { type: "string" },
          amount: { type: "number" },
          energyCertificateId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          expiresAt: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["stored", "listed", "sold"],
          },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["id", "producerId", "amount", "energyCertificateId", "createdAt", "expiresAt", "status"],
      },
      H2ProduceCertificateInput: {
        type: "object",
        properties: {
          producerId: { type: "string" },
          amount: { type: "number" },
          energyCertificateId: { type: "string" },
          expiresAt: { type: "string", format: "date-time" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["producerId", "amount", "energyCertificateId", "expiresAt"],
      },
      H2MarketLot: {
        type: "object",
        properties: {
          id: { type: "string" },
          produceCertificateId: { type: "string" },
          producerId: { type: "string" },
          amount: { type: "number" },
          startingBid: { type: "number" },
          buyoutPrice: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          expiresAt: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["active", "sold", "expired"],
          },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
          highestBid: {
            type: "object",
            properties: {
              id: { type: "string" },
              amount: { type: "number" },
              pricePerKg: { type: "number" },
              bidderId: { type: "string" },
            },
          },
          totalBids: { type: "number" },
        },
        required: [
          "id",
          "produceCertificateId",
          "producerId",
          "amount",
          "startingBid",
          "buyoutPrice",
          "createdAt",
          "expiresAt",
          "status",
        ],
      },
      H2MarketLotInput: {
        type: "object",
        properties: {
          produceCertificateId: { type: "string" },
          producerId: { type: "string" },
          amount: { type: "number" },
          startingBid: { type: "number" },
          buyoutPrice: { type: "number" },
          expiresAt: { type: "string", format: "date-time" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["produceCertificateId", "producerId", "amount", "startingBid", "buyoutPrice", "expiresAt"],
      },
      Bid: {
        type: "object",
        properties: {
          id: { type: "string" },
          lotId: { type: "string" },
          bidderId: { type: "string" },
          amount: { type: "number" },
          pricePerKg: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["pending", "accepted", "rejected"],
          },
          bidderName: { type: "string" },
          totalPrice: { type: "number" },
        },
        required: ["id", "lotId", "bidderId", "amount", "pricePerKg", "createdAt", "status"],
      },
      BidInput: {
        type: "object",
        properties: {
          lotId: { type: "string" },
          bidderId: { type: "string" },
          amount: { type: "number" },
          pricePerKg: { type: "number" },
        },
        required: ["lotId", "bidderId", "amount", "pricePerKg"],
      },
      H2BuyCertificate: {
        type: "object",
        properties: {
          id: { type: "string" },
          buyerId: { type: "string" },
          lotId: { type: "string" },
          amount: { type: "number" },
          price: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          transportStatus: {
            type: "string",
            enum: ["awaiting", "in_transit", "delivered"],
          },
          estimatedDelivery: { type: "string", format: "date-time" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["id", "buyerId", "lotId", "amount", "price", "createdAt", "transportStatus"],
      },
      H2BuyCertificateInput: {
        type: "object",
        properties: {
          buyerId: { type: "string" },
          lotId: { type: "string" },
          amount: { type: "number" },
          price: { type: "number" },
          estimatedDelivery: { type: "string", format: "date-time" },
          mintAddress: { type: "string" },
          metadata: { type: "object" },
        },
        required: ["buyerId", "lotId", "amount", "price"],
      },
      TransportRecord: {
        type: "object",
        properties: {
          id: { type: "string" },
          buyCertificateId: { type: "string" },
          transporterId: { type: "string" },
          status: {
            type: "string",
            enum: ["awaiting", "in_transit", "delivered"],
          },
          startedAt: { type: "string", format: "date-time" },
          completedAt: { type: "string", format: "date-time" },
          estimatedDelivery: { type: "string", format: "date-time" },
          currentLocation: { type: "string" },
          origin: { type: "string" },
          destination: { type: "string" },
          transporterName: { type: "string" },
          steps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                date: { type: "string", format: "date-time" },
                completed: { type: "boolean" },
              },
            },
          },
        },
        required: ["id", "buyCertificateId", "transporterId", "status"],
      },
      TransportRecordInput: {
        type: "object",
        properties: {
          buyCertificateId: { type: "string" },
          transporterId: { type: "string" },
          status: {
            type: "string",
            enum: ["awaiting", "in_transit", "delivered"],
          },
          startedAt: { type: "string", format: "date-time" },
          completedAt: { type: "string", format: "date-time" },
          estimatedDelivery: { type: "string", format: "date-time" },
          currentLocation: { type: "string" },
          origin: { type: "string" },
          destination: { type: "string" },
        },
        required: ["buyCertificateId", "transporterId", "status"],
      },
      GlobalStats: {
        type: "object",
        properties: {
          totalHydrogenProduced: { type: "number" },
          totalHydrogenStored: { type: "number" },
          totalElectricityBurned: { type: "number" },
          activeProducers: { type: "number" },
          activeTransporters: { type: "number" },
          activeBuyers: { type: "number" },
          totalMarketVolume: { type: "number" },
          monthlyProduction: {
            type: "array",
            items: {
              type: "object",
              properties: {
                month: { type: "string" },
                production: { type: "number" },
                consumption: { type: "number" },
              },
            },
          },
          recentActivity: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string" },
                id: { type: "string" },
                details: { type: "string" },
                timestamp: { type: "string", format: "date-time" },
              },
            },
          },
        },
        required: [
          "totalHydrogenProduced",
          "totalHydrogenStored",
          "totalElectricityBurned",
          "activeProducers",
          "activeTransporters",
          "activeBuyers",
          "totalMarketVolume",
        ],
      },
    },
  },
}
