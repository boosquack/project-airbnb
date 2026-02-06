# AirNBook

A full-featured Airbnb-inspired vacation rental platform built with React and TypeScript.

## About

A real-world project exploring React's capabilities including hooks, state management, routing, and component architecture. The app features a complete booking system, reviews and ratings, user authentication, and a public landing page.

### What I Learned

- **React Hooks** - useState, useEffect, useContext, useCallback, useMemo, and custom hooks
- **TypeScript** - Full type safety across the application with typed components, API responses, and Redux state
- **State Management** - Global state with Redux Toolkit (slices, async thunks) and local component state
- **Context API** - Authentication and theme management using React Context
- **React Router** - Client-side routing with public, protected, and semi-protected routes
- **Form Handling** - Building forms with React Hook Form and Zod validation
- **React Query** - Server state management with TanStack Query
- **Component Patterns** - Reusable UI components, compound components, and composition with Radix UI
- **API Integration** - Data fetching with Axios and mock adapter for frontend-only development
- **Modern Tooling** - Vite, ESLint, Prettier, and Tailwind CSS

## Features

- **Public Landing Page** - Hero section with search, featured destinations, top-rated listings carousel, and value propositions
- **User Authentication** - Sign up and sign in with JWT-based auth (access + refresh tokens)
- **Browse Listings** - Explore vacation rental properties with image carousels, ratings, and filtering
- **Search & Filter** - Find properties by location, date range, and number of guests
- **Listing Details** - View property information, amenities, image gallery, and integrated reviews
- **Booking System** - Date selection, guest count, real-time price calculation (nightly rate, service fee, cleaning fee), booking history, and cancellation
- **Reviews & Ratings** - Submit, edit, and delete reviews with star ratings; average rating display on listings
- **Favorites** - Save and manage favorite listings
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-first layout with adaptive navigation

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript 5 |
| UI Library | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router 6 |
| State Management | Redux Toolkit 2 |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS 3 |
| UI Components | Radix UI |
| Icons | Lucide React |
| Date Handling | date-fns, react-day-picker |
| HTTP Client | Axios (with mock adapter) |
| Auth | jose (JWT) |

## Pages & Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/` | Landing Page | Public | Hero, featured destinations, top listings, value propositions |
| `/signin` | Sign In | Guest only | Email/password sign in |
| `/signup` | Sign Up | Guest only | Account registration |
| `/listings` | Listings | Public | Browse and filter all listings |
| `/listings/:id` | Listing Details | Public | Full listing info, booking form, reviews |
| `/bookings` | My Bookings | Protected | Booking history with status and cancellation |
| `/favorites` | Favorites | Protected | Saved favorite listings |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```sh
git clone <repository-url>
cd project-airbnb
```

2. Install dependencies

```sh
npm install
```

3. Start the development server

```sh
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Demo Account

You can sign in with the following demo credentials:

- **Email:** demo@airnbook.com
- **Password:** demo1234

Or create a new account using the Sign Up page.

> **Note:** This app uses a mock API (axios-mock-adapter) with seeded data in localStorage. There is no backend server required.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run prettier` | Run Prettier formatter |
| `npm run fix` | Run both ESLint and Prettier |

## Project Structure

```
src/
├── api/                  # Mock API layer (axios-mock-adapter)
│   ├── data/             # Data models and seed data
│   ├── bookings.ts       # Booking CRUD operations
│   ├── listings.ts       # Listing queries
│   ├── reviews.ts        # Review CRUD operations
│   └── index.ts          # API route definitions
├── components/
│   ├── booking/          # BookingForm, BookingCard, BookingList, BookingConfirmation
│   ├── landing/          # HeroSection, FeaturedDestinations, TopListingsCarousel, etc.
│   ├── reviews/          # StarRating, ReviewCard, ReviewList, ReviewForm
│   ├── ui/               # Reusable UI primitives (Radix-based)
│   ├── Navbar.tsx
│   ├── ListingCard.tsx
│   └── ListingDetailsCard.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── pages/                # Route-level page components
├── state/                # Redux store, slices, and async thunks
│   ├── bookings/
│   ├── listings/
│   └── reviews/
├── types/                # TypeScript type definitions
├── Router.tsx
└── main.tsx
```
