# Crypto Price Tracker

A real-time cryptocurrency price tracker built with React, TypeScript, Redux Toolkit, and TailwindCSS.

![Sample Output](./Sample%20Output.jpg)

## 🎯 Project Objective

Build a responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, similar to CoinMarketCap. The app simulates WebSocket updates and manages all state via Redux.

## ✨ Features

- **Responsive Data Table**: Display cryptocurrency assets with comprehensive data
- **Real-time Price Updates**: Simulated WebSocket updates every 1-2 seconds
- **Redux State Management**: Full state management with Redux Toolkit
- **Visualizations**: 7-day price charts for each cryptocurrency
- **Professional UI**: Styled with TailwindCSS and shadcn/ui components

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS + shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📋 Implementation Checklist

### Project Setup and Configuration
- [x] Initialize Vite project with React, TypeScript
- [x] Install and configure TailwindCSS
- [x] Set up shadcn/ui components
- [x] Create project structure

### Redux Setup
- [x] Install Redux Toolkit and React-Redux
- [x] Configure Redux store
- [x] Create crypto assets slice
- [x] Implement selectors for optimized renders

### UI Components
- [x] Create layout and header component
- [x] Build responsive crypto data table
- [x] Implement 7-day price charts (static SVG/images)
- [x] Style with TailwindCSS and shadcn components

### Real-time Functionality
- [ ] Create WebSocket simulation service
- [ ] Implement random data updates
- [ ] Connect updates to Redux state
- [ ] Add color-coding for price changes

### Optional Enhancements
- [x] Add sorting functionality (by price, % change, etc.)
- [x] Implement filters (top gainers, losers)
- [x] Add localStorage persistence
- [ ] Write unit tests for reducers and selectors
- [ ] Connect to real WebSocket API (e.g., Binance)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd crypto-price-tracker

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📝 Project Structure

```
src/
├── assets/            # Static assets like images
├── components/        # UI components
│   ├── ui/            # Base UI components from shadcn
│   └── ...            # Custom components
├── features/          # Redux features/slices
│   └── crypto/        # Crypto-related Redux code
├── hooks/             # Custom hooks
├── lib/               # Utility functions
├── services/          # API and service functions
├── store/             # Redux store configuration
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 📈 Data Structure

Each cryptocurrency asset will contain the following information:

- Rank (#)
- Logo
- Name
- Symbol
- Current Price
- 1h % Change
- 24h % Change
- 7d % Change
- Market Cap
- 24h Volume
- Circulating Supply
- Max Supply
- 7-day Chart Data
