# H2U Marketplace Frontend

This is the official frontend for the Hydrogen Ukraine Marketplace, a decentralized platform enabling transparent and secure trading of green hydrogen. Built with Next.js, it interfaces with the H2U smart contracts deployed on the Solana blockchain.

⸻

## 🚀 Project Overview

The H2U Marketplace facilitates:
	•	Hydrogen Producers to register and tokenize green hydrogen production.
	•	Buyers to discover, purchase, and track certified hydrogen batches.
	•	Regulators to verify energy origin and ensure compliance with EU standards.

The frontend provides an intuitive interface for interacting with the underlying blockchain infrastructure, ensuring transparency and traceability in hydrogen trading.

## 🛠️ Project Structure
```
├── app/                   # Next.js app directory
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks, including jotai hooks
├── lib/                   # Utility functions and API clients + jotai actions
├── public/                # Static assets
├── styles/                # Global and component-specific styles
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Project metadata and scripts
└── tsconfig.json          # TypeScript configuration
```

## Installation
```
git clone https://github.com/HydrogenUkraine/H2U-Marketplace.git
cd H2U-Marketplace
pnpm install
pnpm run dev
```

## 🔑 Features
	•	Hydrogen Production Registration: Producers can register hydrogen production batches, which are tokenized on-chain.
	•	Marketplace Listings: Producers can list hydrogen tokens for sale, specifying quantity and price.
	•	Purchasing Mechanism: Buyers can purchase hydrogen tokens using USDC, with transactions handled securely via smart contracts.
	•	Dashboard: Users can view their token balances, transaction history, and active listings. ￼