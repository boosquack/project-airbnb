import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Route from '@/components/Route';
import BookingsPage from '@/pages/BookingsPage';
import LandingPage from '@/pages/LandingPage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import ListingsPage from '@/pages/ListingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signin',
        element: (
          <Route>
            <SignInPage />
          </Route>
        ),
      },
      {
        path: '/signup',
        element: (
          <Route>
            <SignUpPage />
          </Route>
        ),
      },
      {
        // Public - anyone can browse listings
        path: '/listings',
        element: <ListingsPage />,
      },
      {
        // Public - anyone can view listing details
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        // Protected - only logged in users can see favorites
        path: '/favorites',
        element: (
          <Route isProtected>
            <ListingFavoritesPage />
          </Route>
        ),
      },
      {
        // Protected - only logged in users can see bookings
        path: '/bookings',
        element: (
          <Route isProtected>
            <BookingsPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
