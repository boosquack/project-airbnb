import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Setup the Redux store',
  'Connect Redux to React',
  'Create the <code>listings</code> slice',
  'Add the <code>listings</code> slice to the Redux store',
  'Create the <code>fetchListings</code> async thunk',
  'Create the <code>fetchListings</code> extra reducers',
  'Refactor the <code>HomePage</code> with <code>listingsSlice</code>',
  'Set up favorite listings',
  'Create the <code>ListingFavoritesPage</code> component',
  'Create the <code>Navbar</code> component',
  'Add <code>Navbar</code> to <code>App</code>',
  'Update <code>Router</code> to allow navigation to favorites',
  'Create the <code>ListingFavoriteButton</code> component',
  'Add <code>ListingFavoriteButton</code> to the <code>ListingCard</code> component',
  'Add <code>ListingFavoriteButton</code> to the <code>ListingDetailsCard</code> component',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 6 - State Management</h2>
      <Separator className='mb-2' />
      <p>
        In this module we'll be setting up global state in our application.
        Global state means state that is accessible by any component no matter
        where they are in the component tree. This will allow us to share data
        between components without having to pass it down through props.
      </p>
      <p>
        We'll be using the popular Redux library for this, which is a great
        library for writing scalable state management. We'll be using it with
        Redux Toolkit, which provides a lot of the functionality out of the box
        for us to use so that we can focus on what matters: building a great
        application!
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        Currently, all of our data is stored locally in the state of our
        components. For example the <code>listings</code> in the{' '}
        <code>HomePage</code> are fetched and stored in <code>HomePage</code>'s
        local state through the <code>useFetch</code> custom hook. The same is
        true for the <code>ListingDetailsPage</code> component.
      </p>
      <p>
        We need to change that because we will add some new functionality to our
        app. We'll add a new "Favorites" page that will show the user's favorite
        listings. Since we'll have multiple pages that can now show the same
        listing, adding a listing to favorites should reflect on any page that
        the listing is on. This will require us to have global state.
      </p>
      <p>
        We'll need to use Redux to store the listings in global state, and then
        have them accessible to any component in our app. This will allow us to
        then update the listings which are favorited by the user, and have them
        dynamically show up on the "Favorites" page.
      </p>
      <p>
        One important thing to note is that we will be handling all of this on
        the client only. Since we don't have a backend, there is no way to save
        listings to favorites. Instead, we'll keep that state in memory, and use
        that to show if a listing is favorited or not. But as soon as we
        refresh, that state will be reset.
      </p>
      <p>
        To do all of that we'll need to setup Redux, create our global store,
        and create some reducers and actions that will control how the store
        changes over time. We'll then change our fetching to be done through
        Redux, as well as create the "Favorites" page to allow users to favorite
        any listing.
      </p>
      <h3>Tasks</h3>
      <Separator className='mb-2' />
      <ul>
        {tasks.map((task) => (
          <li key={task} dangerouslySetInnerHTML={{ __html: task }} />
        ))}
      </ul>
    </div>
  );
};

const storeCode = `import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});`;

export const Step1 = () => {
  return (
    <div>
      <h2>Setting up the Redux store</h2>
      <p>
        The first thing that we need to do is to setup the Redux store. The
        Redux store is the entry point of the Redux state. We'll use this to
        access all of our individual reducers across our entire application.
      </p>
      <p>
        The store is usually made up of multiple reducers, which all represent a
        different "slice" of the app related to certain features. For now, since
        we don't have any reducers created yet we'll just provide an empty
        object. We need to export this store as we'll use it in the next step.
      </p>
      <p>
        We'll create a new file in the <code>src/state</code> folder called{' '}
        <code>store.js</code> with the following code:
      </p>
      <CodeHighlighter title='src/state/store.js'>{storeCode}</CodeHighlighter>
    </div>
  );
};

const mainWithStoreCode = `import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <Router />
    </Provider>
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>Connecting Redux to React</h2>
      <p>
        Now that we have our store, we need to connect it to React since our
        React application cannot directly talk to Redux. Redux actually doesn't
        even require React to work, it is completely standalone! So for us to
        access the store, we need to connect it to our React application through
        the <code>Provider</code> from <code>react-redux</code>.
      </p>
      <p>
        The <code>Provider</code> from <code>react-redux</code> works through
        the Context API from React. We can wrap our entire app with it as we
        would with any other context and then give it the <code>store</code>{' '}
        that we created in the previous step. This will make our{' '}
        <code>store</code> accessible from any component in our application.
      </p>
      <p>
        We'll need to update the <code>main.jsx</code> file with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[2, 6, 17, 19]} title='src/main.jsx'>
        {mainWithStoreCode}
      </CodeHighlighter>
    </div>
  );
};

const listingsSliceCode = `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
});

export default listingsSlice.reducer;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Creating the <code>listings</code> slice
      </h2>
      <p>
        Now that we have our store setup, it's time to create our first slice.
        In Redux, a slice is a collection of reducers, actions and selectors
        that are related to a specific part of our application. Each slice will
        then get put in our <code>store</code> to be accessed across our app.
      </p>
      <p>
        In our case, we're currently only concerned with the{' '}
        <code>listings</code>. We need to fetch them, display them, handle error
        and loading states, and eventually allow favorites. That means that our
        first slice is going to be the <code>listings</code> slice that will
        handle all of that.
      </p>
      <p>
        We'll need to define our <code>initialState</code>, as well as our slice
        using the <code>createSlice</code> helper function from Redux toolkit.
        We'll first give it a name of "listings" to represent our{' '}
        <code>listings</code>, then we'll pass our <code>initialState</code>,
        and then we'll define an empty object for the <code>reducers</code> as
        we'll be building them in the next steps. Finally, we'll export the{' '}
        <code>listingsSlice.reducer</code> to use in our store.
      </p>
      <p>
        We'll need to create a new file inside <code>src/state/listings</code>{' '}
        called <code>listingsSlice.js</code> with the following code:
      </p>
      <CodeHighlighter title='src/state/listings/listingsSlice.js'>
        {listingsSliceCode}
      </CodeHighlighter>
    </div>
  );
};

const storeWithListingsSliceCode = `import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Adding the <code>listings</code> slice to the Redux store
      </h2>
      <p>
        With our <code>listingsSlice</code> now created, we need to import the
        reducer we exported and plug it into our <code>store</code>. This will
        automatically give our React application access to that slice.
      </p>
      <p>
        The benefit of doing it this way is that we can create as many slices as
        we want and import them all here to combine them into our store. This
        will allow us to have separation of concerns and efficiently organise
        our application as it grows, yet at the same time have on central point
        for our Redux state that is accessible from anywhere in our app.
      </p>
      <p>
        We'll need to update the <code>store.js</code> file with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[3, 7]} title='src/state/store.js'>
        {storeWithListingsSliceCode}
      </CodeHighlighter>
    </div>
  );
};

const listingsSliceWithAsyncThunkCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Creating the <code>fetchListings</code> async thunk
      </h2>
      <p>
        The next step is for us to start handling our fetching of{' '}
        <code>listings</code> through Redux. We'll be doing the exact same thing
        as we did before with the only difference that now we will use the{' '}
        <code>listingsSlice</code> to store the state and update it instead of
        having it locally in the <code>HomePage</code> component.
      </p>
      <p>
        To do that, we'll have to use <code>createAsyncThunk</code> from Redux
        to create an asynchronous action. We'll give it a name of
        <code>listings/fetchListings</code> to represent the slice and the
        action, and then we'll pass it an async function that will fetch the
        listings from the same endpoint that we used before. We'll also need to
        have this function take in an optional <code>options</code> parameter,
        as we did in <code>useFetch</code> previously, to keep the same
        filtering functionality.
      </p>
      <p>
        It's important to note that because we're using{' '}
        <code>createAsyncThunk</code> from Redux Toolkit, we don't need to
        explicitly handle the error and loading states inside of this function.
        Instead, we'll handle those in the next step by adding some reducers.
      </p>
      <p>
        We'll need to update the <code>listingsSlice.js</code> file with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 17, 18, 19, 20, 21, 22, 23]}
        title='src/state/listings/listingsSlice.js'
      >
        {listingsSliceWithAsyncThunkCode}
      </CodeHighlighter>
    </div>
  );
};

const listingsSliceWithExtraReducersCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }

        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Creating the <code>fetchListings</code> extra reducers
      </h2>
      <p>
        Our <code>fetchListings</code> async thunk action is now created, but we
        haven't yet defined how our slice should react to it. We need to create
        some reducers that will tell Redux what it should do in response to the
        different states of <code>fetchListings</code>.
      </p>
      <p>
        To keep the same functionality we had previously, we need to store the
        fetched <code>listings</code> in the state, as well as handle the error
        and loading states. Luckily, most of that is handled automatically by
        Redux Toolkit. Because we are using <code>createAsyncThunk</code>, we
        automatically get access to the <code>pending</code>,{' '}
        <code>fulfilled</code>, and <code>rejected</code> states.
      </p>
      <p>
        When working with async functions through <code>createAsyncThunk</code>{' '}
        we need to use the <code>extraReducers</code> property of{' '}
        <code>createSlice</code>. This will allow us to configure a response to
        each of those states. The <code>extraReducers</code> property gives us a{' '}
        <code>builder</code> which we can add cases to.
      </p>
      <p>
        Each of these cases will receive the <code>state</code> as well as an
        optional <code>action</code> with a <code>payload</code> property
        containing our data. We'll update the <code>status</code> property as
        we're fetching, then if there's an error we'll set it in the{' '}
        <code>rejected</code> state, otherwise we'll update the{' '}
        <code>listings</code> with our API data.
      </p>
      <p>
        We'll also need to prepare the <code>fetchListings.rejected</code> case
        to handle a request cancellation. Since we're going to be moving our
        fetch from <code>useFetch</code> to Redux, we'll need to re-implement
        aborting a request to prevent race conditions.
      </p>
      <p>
        We'll need to update the <code>listingsSlice.js</code> file with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
          33,
        ]}
        title='src/state/listings/listingsSlice.jsx'
      >
        {listingsSliceWithExtraReducersCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithFetchListingsDispatchCode = `import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';

const HomePage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Refactoring the <code>HomePage</code> with <code>listingsSlice</code>
      </h2>
      <p>
        Now that we have our slice ready with actions and reducers, we can
        finally start using it in our React components. We'll start by
        refactoring <code>HomePage</code> to now fetch the <code>listings</code>{' '}
        using our new async action, and we'll get the state from Redux using a
        selector.
      </p>
      <p>
        To access any piece of state in Redux you use a selector through the{' '}
        <code>useSelector</code> hook. The selector is a function that takes in
        the <code>state</code> and selects any subset of it. For our case, we
        want to access the <code>listingsSlice</code> which will be under{' '}
        <code>state.listings</code>. Passing that selector to{' '}
        <code>useSelector</code> will return that piece of state which holds our{' '}
        <code>listings</code>, <code>error</code>, and <code>status</code>{' '}
        states.
      </p>
      <p>
        Then, to dispatch actions to redux we'll use the <code>dispatch</code>{' '}
        function returned from <code>useDispatch</code>. We'll be able to
        dispatch the <code>fetchListings</code> action with it and Redux will
        automatically handle updating the state for us.
      </p>
      <p>
        Since we're no longer using the <code>useFetch</code> custom hook for
        this request, we'll need to re-implement our logic to abort a request if
        another one is made before it finishes. Luckily, this is easily doable
        with Redux. Calling <code>dispatch</code> will return a Promise that has
        an attached <code>abort</code> function that we can call in the cleanup
        function of the <code>useEffect</code>. Our request will now be properly
        handled during an abort with the code that we've setup here and in the
        previous step.
      </p>
      <p>
        It's worth noting that with these changes, we've lost some of the
        functionality that we've added in previous steps. We've lost the caching
        we setup in <code>useFetch</code>. Unfortunately, Redux doesn't make it
        easy to implement our own caching solution as we did previously, so
        we'll leave it out.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 8, 11, 12, 22, 23, 24, 25, 26, 27, 28, 40]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFetchListingsDispatchCode}
      </CodeHighlighter>
    </div>
  );
};

const listingsSliceWithFavoritesCode = `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  favoriteListingIds: [],
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action) => {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        const message = action.error.message;

        if (message !== 'Aborted') {
          state.status = 'failed';
          state.error = message;
        }
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;`;

export const Step8 = () => {
  return (
    <div>
      <h2>Setting up favorite listings</h2>
      <p>
        The next step for us is to add some new functionality to our app again.
        We'll add the ability for users to favorite their listings and have
        those listings show up in a separate page. We'll be using the{' '}
        <code>listingsSlice</code> to store the favorite listings, as well as
        hold the actions and reducers to add/remove them.
      </p>
      <p>
        The first thing that we need to do is to add a new{' '}
        <code>favoriteListingIds</code> property to the{' '}
        <code>listingsSlice</code> state. This will hold the IDs of the user's
        favorited listings. We'll use these IDs to check if a listing is a
        favorite or not.
      </p>
      <p>
        Then, we'll need to create some reducers to handle adding and removing a
        listing from the favorites. These will be synchronous actions, so we
        will not need to use an async thunk. Instead, we'll define two reducers
        inside of the <code>reducers</code> object of our slice.
      </p>
      <p>
        Because we're working with Redux Toolkit and using{' '}
        <code>createSlice</code>, we actually don't need to create our
        corresponding actions like we did with the async thunk. Instead we can
        simply access and export them through <code>listingsSlice.actions</code>
        .
      </p>
      <p>
        We'll need to update the <code>listingsSlice</code> with the following
        code:
      </p>
      <CodeHighlighter
        highlightedLines={[8, 16, 17, 18, 19, 20, 21, 22, 23, 53, 54]}
        title='src/state/listings/listingsSlice.js'
      >
        {listingsSliceWithFavoritesCode}
      </CodeHighlighter>
    </div>
  );
};

const listingFavoritesPageCode = `import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/ListingList';

const ListingFavoritesPage = () => {
  const { listings, favoriteListingIds } = useSelector(
    (state) => state.listings,
  );

  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteListingIds.includes(listing.id)),
    [listings, favoriteListingIds],
  );

  return (
    <div className='container py-4'>
      <ListingList listings={favoriteListings} />
    </div>
  );
};

export default ListingFavoritesPage;
`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingFavoritesPage</code> component
      </h2>
      <p>
        Now that we have our slice setup to handle favorite listings, we can go
        ahead and create the page for it. This will be the "Favorites" page and
        will be responsible for getting the favorite listings from the{' '}
        <code>listingsSlice</code> and rendering them.
      </p>
      <p>
        We'll use the <code>useSelector</code> hook to access our{' '}
        <code>state.listings</code>, which will give us access to{' '}
        <code>favoriteListingIds</code> and <code>listings</code>. We'll need
        both to be able to render all of the favorited listings.
      </p>
      <p>
        Since one part of our state holds the favorite IDs and another the
        listing objects, we'll need to create our own{' '}
        <code>favoriteListings</code> array by filtering all{' '}
        <code>listings</code> for the ones that are favorited. We'll wrap that
        in <code>useMemo</code> to prevent unnecessary computations of this
        array.
      </p>
      <p>
        It's important to remember that no fetching will happen here. The
        favorite listings feature is client-only because there is no backend.
        This means that we can't fetch which listings are favorites. Instead,
        we'll use the listings already fetched in the "Home" page, and compare
        those to see which ones are favorited or not based on the Redux state.
        Thus, we don't need to handle error or loading states at all. This also
        means that our favorites will reset everytime we refresh the page, since
        nothing is persisted!
      </p>
      <p>
        We'll need to create a new file inside <code>src/pages</code> called{' '}
        <code>ListingFavoritesPage.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/pages/ListingFavoritesPage.jsx'>
        {listingFavoritesPageCode}
      </CodeHighlighter>
    </div>
  );
};

const navBarCode = `import { Link } from 'react-router-dom';

import { Separator } from '@/components/ui';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <Link to='/favorites'>Favorites</Link>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Creating the <code>Navbar</code> component
      </h2>
      <p>
        With our "Favorites" page created, we should create a navigation bar to
        allow us to easily navigate to it. As it stands currently, there's no
        obvious place to put a link to "Favorites" so we need to create one.
      </p>
      <p>
        The <code>Navbar</code> will for now just hold a link to "Home", as well
        as a link to our new "Favorites" page. Later on we will add more things
        to it, so it is a good thing to have!
      </p>
      <p>
        We'll need to create a new file inside <code>src/components</code>{' '}
        called <code>Navbar.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/Navbar.jsx'>
        {navBarCode}
      </CodeHighlighter>
    </div>
  );
};

const appWithNavbarCode = `import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';
import Navbar from '@/components/Navbar';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default App;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Adding <code>Navbar</code> to <code>App</code>
      </h2>
      <p>
        You've probably guessed it already, the next step is to add the{' '}
        <code>Navbar</code> component to our <code>App</code> component. This
        will allow us to see the navigation bar on every page of our app.
      </p>
      <p>
        However, we don't want the <code>Navbar</code> to cover the{' '}
        <code>Devbar</code> so we'll add it right above the <code>Outlet</code>{' '}
        component so it is wrapped in the same container styles and won't
        interfere with the left part of the app.
      </p>
      <p>
        We'll need to update the <code>App</code> component with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[4, 13]} title='src/App.jsx'>
        {appWithNavbarCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithFavoritesCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        path: '/favorites',
        element: <ListingFavoritesPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Updating <code>Router</code> to allow navigation to favorites
      </h2>
      <p>
        The last thing we need to do is to update our <code>Router</code> to
        create a route for our favorites page. This will make navigating to{' '}
        <code>/favorites</code> work and render the{' '}
        <code>ListingFavoritesPage</code>.
      </p>
      <p>
        We'll add the <code>ListingFavoritesPage</code> right under{' '}
        <code>ListingDetailsPage</code> so it is nicely organised and will
        render as a child of <code>App</code>.
      </p>
      <p>
        We'll need to update the <code>Router</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 24, 25, 26, 27]}
        title='src/Router.jsx'
      >
        {routerWithFavoritesCode}
      </CodeHighlighter>
    </div>
  );
};

const listingFavoriteButtonCode = `import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import {
  addFavoriteListing,
  removeFavoriteListing,
} from '@/state/listings/listingsSlice';

const ListingFavoriteButton = ({ className, listing }) => {
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );
  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={className}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing(listing.id));
        } else {
          dispatch(addFavoriteListing(listing.id));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;`;

export const Step13 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingFavoriteButton</code> component
      </h2>
      <p>
        Now that our <code>ListingFavoritesPage</code> is created and fully
        functional, we need the ability to favorite listings so they can show up
        on the page! We'll need to create a button that will be connected to
        Redux and will allow us to favorite a listing or remove it from the
        favorites.
      </p>
      <p>
        Since this is a button that we're going to need in multiple places, it's
        a good idea to make it into a re-usable component. Because we have
        access to Redux from anywhere in our application, it would also make
        sense to have this component encapsulate all of the logic needed to
        favorite a listing. That way, we can simply use it anywhere and it will
        work automatically.
      </p>
      <p>
        We're going to make use once again of <code>useSelector</code> from
        Redux to access the <code>favoriteListingIds</code> array. We can then
        use it to compare with the <code>listing.id</code> that this component
        will receive from its props and figure out if a listing is favorited or
        not. We'll add a function to the <code>Button</code>'s{' '}
        <code>onClick</code> event handler that will check whether or not the
        listing is favorited, and dispatch the correct action. We'll also need
        to add <code>e.preventDefault()</code> to not interfere with the{' '}
        <code>Link</code> that we have in <code>ListingCard</code>.
      </p>
      <p></p>
      <p>
        We'll need to create a new file inside <code>src/components</code>{' '}
        called <code>ListingFavoriteButton.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/ListingFavoriteButton.jsx'>
        {listingFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardWithFavoriteButtonCode = `import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={${'`/listings/${listing.id}`'}}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={listing} />
          <ListingFavoriteButton
            listing={listing}
            className='absolute right-4 top-4'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;`;

export const Step14 = () => {
  return (
    <div>
      <h2>
        Adding <code>ListingFavoriteButton</code> to the{' '}
        <code>ListingCard</code> component
      </h2>
      <p>
        The next step is to add this button to the <code>ListingCard</code>{' '}
        component. This will allow users to easily add a listing to their
        favorites right from the home page, where all of the listing cards are
        displayed.
      </p>
      <p>
        The benefit of using Redux is that all of the logic required to favorite
        a listing is contained in the <code>ListingFavoriteButton</code>.
        Dispatching actions will work directly from that component to the Redux
        store which will then be accessible from anywhere in our app.
      </p>
      <p>
        We'll need to slightly change the styles of our <code>ListingCard</code>{' '}
        component to make the button fit at the top right of the image. We'll
        use absolute positioning for this so that is clearly visible.
      </p>
      <p>
        We'll need to update the <code>ListingCard</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 12, 13, 14, 15, 16, 17, 18]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsCardWithFavoriteButtonCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </div>
        <ListingFavoriteButton listing={listing} />
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step15 = () => {
  return (
    <div>
      <h2>
        Adding <code>ListingFavoriteButton</code> to the{' '}
        <code>ListingDetailsCard</code> component
      </h2>
      <p>
        Finally, we need to add the <code>ListingFavoriteButton</code> to the{' '}
        <code>ListingDetailsCard</code> component. This will allow users to
        favorite a listing from the listing details page.
      </p>
      <p>
        The beauty of doing it this way is that because our app now shares a
        global state, adding a favorite listing from any page will automatically
        keep in sync every other component that uses the same state. This
        includes having them show up in the "Favorites" page, as well as
        updating every instance of <code>ListingFavoriteButton</code>.
      </p>
      <p>
        This happens because each component is accessing the same state through{' '}
        <code>useSelector</code> hooks, and updating the same state through{' '}
        <code>dispatch</code> calls. There is only one single source of truth
        and all components listen to it. Redux is a really great tool!
      </p>
      <p>
        We'll need to update the <code>ListingDetailsCard</code> component with
        the following code:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 12, 35, 36]}
        title='src/components/ListingDetailsCard.jsx'
      >
        {listingDetailsCardWithFavoriteButtonCode}
      </CodeHighlighter>
    </div>
  );
};

export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Module Completed!</h2>
      <p>
        Congratulations! You've successfully completed the 6th module of the
        course. You should now have your data coming from the Redux store, and
        you should have the ability to favorite and unfavorite a listing and
        have it show up on the "Favorites" page! If your code is not working as
        expected, you can always refer to the solution on GitHub using the link
        above. You can also post on the Discord and some one will help you
        figure it out!
      </p>
      <p>
        In this module you've learnt how to setup and use Redux, how to create a
        store, actions, and reducers, and how to connect everything from
        different components. You've moved the fetching of the listings to Redux
        and have added the ability to add listings to favorites!
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>7-forms-and-authentication</code> from the dropdown above. See you
        there!
      </p>
      <h3>Completed Tasks</h3>
      <Separator className='mb-2' />
      <TaskList checked tasks={tasks} />
      <div className='absolute -top-6'>
        <Confetti
          numberOfPieces={200}
          recycle={false}
          height={window.innerHeight - 200}
          width={650}
        />
      </div>
    </div>
  );
};
