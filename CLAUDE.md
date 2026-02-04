# Airbnb Clone Improvement Plan

## Overview

Transform the existing Airbnb clone into a more complete application with:
1. **Public landing page** with featured destinations and search
2. **Booking system** with date selection, price calculation, and booking history
3. **Reviews & ratings** with user submissions and display

---

## Phase 1: Foundation Setup

### 1.1 Data Layer Updates
- Add `src/api/data/bookings.js` - Booking data structure
- Update `src/api/data/seed.js` - Include bookings table in database
- Enhance `src/api/reviews.js` - Add create/update/delete operations
- Add `src/api/bookings.js` - Booking CRUD operations

### 1.2 Redux State
- Create `src/state/bookings/bookingsSlice.js`
- Create `src/state/reviews/reviewsSlice.js`
- Update `src/state/store.js` - Register new reducers

---

## Phase 2: Reviews & Ratings System

### New Components
| File | Purpose |
|------|---------|
| `src/components/reviews/StarRatingDisplay.jsx` | Read-only star display |
| `src/components/reviews/StarRating.jsx` | Interactive rating input |
| `src/components/reviews/ReviewCard.jsx` | Single review display |
| `src/components/reviews/ReviewList.jsx` | Reviews list with summary |
| `src/components/reviews/ReviewForm.jsx` | Submit/edit review form |

### Integration Points
- **ListingDetailsCard.jsx** - Add reviews section below listing info
- **ListingCard.jsx** - Show average rating badge
- **api/index.js** - Add review endpoints (POST/PUT/DELETE)

### API Endpoints
```
POST   /api/reviews        - Create review
PUT    /api/reviews/:id    - Update own review
DELETE /api/reviews/:id    - Delete own review
GET    /api/reviews/:listingId - Get listing reviews (existing)
```

---

## Phase 3: Booking System

### New Components
| File | Purpose |
|------|---------|
| `src/components/booking/BookingForm.jsx` | Date picker + price calculation |
| `src/components/booking/BookingConfirmation.jsx` | Success confirmation |
| `src/components/booking/BookingCard.jsx` | Single booking display |
| `src/components/booking/BookingList.jsx` | Booking history list |

### New Page
- `src/pages/BookingsPage.jsx` - User's booking history

### Integration Points
- **ListingDetailsCard.jsx** - Add booking form sidebar
- **Router.jsx** - Add `/bookings` route
- **Navbar.jsx** - Add "My Bookings" link
- **api/index.js** - Add booking endpoints

### API Endpoints
```
GET    /api/bookings       - Get user's bookings
POST   /api/bookings       - Create booking
DELETE /api/bookings/:id   - Cancel booking
```

### Booking Data Model
```javascript
{
  id: number,
  userId: number,
  listingId: number,
  checkIn: Date,
  checkOut: Date,
  guests: number,
  totalPrice: number,
  status: 'confirmed' | 'completed' | 'cancelled',
  createdAt: Date
}
```

---

## Phase 4: Landing Page

### New Components
| File | Purpose |
|------|---------|
| `src/components/landing/HeroSection.jsx` | Hero with search bar |
| `src/components/landing/FeaturedDestinations.jsx` | Destination cards grid |
| `src/components/landing/TopListingsCarousel.jsx` | Top-rated listings |
| `src/components/landing/ValuePropositions.jsx` | Features/benefits |
| `src/components/landing/Footer.jsx` | Site footer |

### New Page
- `src/pages/LandingPage.jsx` - Public landing page

### Route Changes
| Before | After |
|--------|-------|
| `/` (protected) → HomePage | `/` (public) → LandingPage |
| - | `/listings` (protected) → ListingsPage |

### File Renames
- `HomePage.jsx` → `ListingsPage.jsx`

### API Additions
```
GET /api/listings/featured - Top-rated listings (public, no auth)
GET /api/listings/public   - Public listing search
```

---

## Phase 5: Polish & Integration

### App.jsx Updates
- Conditional navbar (hide on landing page)
- Proper redirect after auth (→ `/listings`)

### UI/UX Polish
- Responsive design for all new components
- Dark mode compatibility
- Loading states and error handling
- Empty states with friendly messaging

---

## File Structure Summary

```
src/
├── pages/
│   ├── LandingPage.jsx          # NEW - Public landing
│   ├── ListingsPage.jsx         # RENAMED from HomePage
│   ├── BookingsPage.jsx         # NEW - Booking history
│   └── ... (existing)
│
├── components/
│   ├── landing/
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedDestinations.jsx
│   │   ├── TopListingsCarousel.jsx
│   │   ├── ValuePropositions.jsx
│   │   └── Footer.jsx
│   │
│   ├── booking/
│   │   ├── BookingForm.jsx
│   │   ├── BookingConfirmation.jsx
│   │   ├── BookingCard.jsx
│   │   └── BookingList.jsx
│   │
│   └── reviews/
│       ├── StarRating.jsx
│       ├── StarRatingDisplay.jsx
│       ├── ReviewCard.jsx
│       ├── ReviewList.jsx
│       └── ReviewForm.jsx
│
├── api/
│   ├── bookings.js              # NEW
│   └── data/bookings.js         # NEW
│
└── state/
    ├── bookings/bookingsSlice.js # NEW
    └── reviews/reviewsSlice.js   # NEW
```

---

## Critical Files to Modify

1. **src/Router.jsx** - Route restructuring
2. **src/App.jsx** - Conditional navbar logic
3. **src/api/index.js** - New API endpoints
4. **src/state/store.js** - Register new slices
5. **src/components/ListingDetailsCard.jsx** - Add booking + reviews
6. **src/components/ListingCard.jsx** - Add rating display
7. **src/components/Navbar.jsx** - Add Bookings link

---

## Reusable Existing Components

- `DateRangePicker` - For booking date selection
- `Carousel` - For top listings display
- `Card/CardContent` - For all new cards
- `Button` - For all CTAs
- `Avatar` - For review author display
- `Stepper` - For guest count
- `Spinner` - For loading states

---

## Verification Plan

1. **Landing Page**: Visit `/` without auth, verify search redirects to `/signin`
2. **Auth Flow**: Sign in, verify redirect to `/listings`
3. **Reviews**: View listing, submit review, edit, delete
4. **Booking**: Select dates, create booking, view in `/bookings`
5. **Responsive**: Test all pages at mobile/tablet/desktop
6. **Dark Mode**: Toggle theme, verify all new components
