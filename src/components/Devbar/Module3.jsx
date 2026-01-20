import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Prepare <code>HomePage</code> for data fetching',
  'Fetch listings in <code>HomePage</code>',
  'Add a loading state to <code>HomePage</code>',
  'Add an error state to <code>HomePage</code>',
  'Add filters to <code>HomePage</code>',
  'Implement an AbortController in <code>HomePage</code>',
  'Update <code>ListingCard</code> with new data',
  'Create the <code>ListingCardImages</code> component',
  'Update <code>ListingCard</code> with <code>ListingCardImages</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 3 - Effects and Data Fetching</h2>
      <Separator className='mb-2' />
      <p>
        In this module, we'll be working with effects and data fetching. We will
        learn about <code>useEffect</code> and how it works, learn about
        dependency arrays, as well as the lifecycle of the effect in a React
        component.
      </p>
      <p>
        We're also going to learn how to fetch data from an API using{' '}
        <code>useEffect</code>. We'll learn how to manage our own loading and
        error states, as well as how to prevent race conditions from multiple
        requests firing at different times!
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        Currently, while our <code>listings</code> in <code>HomePage</code> are
        stateful, the data is directly imported from the static list defined in{' '}
        <code>src/api/data/listings</code>. Also, when applying our filters to{' '}
        <code>listings</code>, we're actually only filtering the static list
        imported. We need to change that.
      </p>
      <p>
        The next step for us is to fetch this data from the API instead. This is
        how most React applications work in the real world, so it's a good thing
        to know how to do. To fetch our data we'll be using a custom wrapper
        around <code>axios</code> that we have available in the project under{' '}
        <code>api</code>.
      </p>
      <p>
        It's important to note that the <code>api</code> available in our app is
        a mock API. This means that we'll be working with it and calling it as
        we would in a real application, but all the data is mocked. The data
        will instead come from the <code>localSorage</code>, which gets
        initialized from that same static list of <code>listings</code> that we
        used so far. We are doing this because we don't have a backend for this
        application, so we're mocking it instead. But that's great because we
        get all the benefits of working with an API without implementing our own
        backend!
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

const homePagePreparedForFetchingCode = `import { useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  const handleFilters = (filters) => {
    // Will implement later
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Preparing <code>HomePage</code> for data fetching
      </h2>
      <p>
        The first thing that we need to do is to remove the{' '}
        <code>staticListings</code> from <code>HomePage</code> as we'll no
        longer be using them directly. We are going to prepare{' '}
        <code>HomePage</code> to fetch the <code>listings</code> from the mock
        API instead. Then we are going to set our initial <code>listings</code>{' '}
        state with an empty array. This will make our <code>listings</code>{' '}
        disappear from the UI for now, but don't worry, we'll be adding them
        back in the next step.
      </p>
      <p>
        Then, we'll also need to remove our implementation of{' '}
        <code>handleFilters</code> since the filtering will no longer happen in
        the <code>HomePage</code> component. In later steps, we'll implement
        filtering by sending the data to the API. For now we will leave the{' '}
        <code>handleFilters</code> function empty with a comment to remind us
        that we'll have to implement it later.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[8, 11]}
        title='src/pages/HomePage.jsx'
      >
        {homePagePreparedForFetchingCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithFetchingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await api.get('/api/listings');
      setListings(response.data);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Fetching listings in <code>HomePage</code>
      </h2>
      <p>
        Now that our <code>HomePage</code> is ready to fetch data, we can start
        adding the code that will make that happen. We'll be handling our data
        fetching with <code>useEffect</code>, and we'll need to implement a
        function to fetch the listings. We will define that function inside of
        the <code>useEffect</code> and we'll call it when <code>HomePage</code>{' '}
        mounts. We'll give it <code>fetchListings</code> as a name to make it
        clear what it does.
      </p>
      <p>
        The reason for defining <code>fetchListings</code> inside of the{' '}
        <code>useEffect</code> instead of outside is so that we don't have to
        provide it in the dependency array. It's always a good idea to limit the
        amount of dependencies you pass to <code>useEffect</code>.
      </p>
      <p>
        The <code>fetchListings</code> function will use our <code>api</code>{' '}
        wrapper and call the <code>/api/listings</code> endpoint to fetch all of
        the listings. This is the standard way of fetching data from an API and
        our mock <code>api</code> allows us to do it as if we were fetching from
        a real API.
      </p>
      <p>
        Once we have a response from the API, we'll update the{' '}
        <code>listings</code> by calling the <code>setListings</code> function
        with the <code>response.data</code> property. This will re-render our
        component and show the fetched listings on the screen.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 11, 12, 13, 14, 15, 16, 17, 18]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFetchingCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithLoadingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      const response = await api.get('/api/listings');
      setListings(response.data);

      setIsLoading(false);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Adding a loading state to <code>HomePage</code>
      </h2>
      <p>
        Great! Our listings are now fetched from the API and correctly displayed
        on the home page. However, there's a small UI bug. The way it is
        currently, the user sees a "No listings found." message until the fetch
        returns some data, which isn't a great user experience. We need to do
        something to let the user know that the listings are being fetched.
      </p>
      <p>
        To do that, we'll need to create and track our own loading state. We'll
        do that through a variable called <code>isLoading</code>. We'll set that
        to <code>true</code> initially when our component mounts, and then{' '}
        <code>false</code> when the fetch returns some data. Since we're going
        to allow multiple fetches during the lifecycle of this component, we'll
        also need to make sure that we set <code>isLoading</code> to{' '}
        <code>true</code> again everytime the <code>fetchListings</code>{' '}
        function is called.
      </p>
      <p>
        To make it easier for us to render out a different UI based on the
        loading state, we'll adopt a pattern that is commonly used in React.
        We'll create a function called <code>renderListingList</code> that will
        return the JSX that we want to render. We can configure it to return a{' '}
        <code>Spinner</code> component while <code>isLoading</code> is{' '}
        <code>true</code>, otherwise return the <code>ListingList</code>{' '}
        component.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          6, 10, 14, 19, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 47,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithLoadingCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithErrorCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings');
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Adding an error state to <code>HomePage</code>
      </h2>
      <p>
        Our application is much more user friendly now! However, there's still
        one more thing that we need to do. What happens if the API is down? Or
        if there's an error with our request? Currently, our app will crash and
        the user will have no idea what happened. We need to handle the error
        state of our fetch.
      </p>
      <p>
        Just like we created a <code>isLoading</code> state variable to track
        our loading state, we'll need to create an <code>error</code> state
        variable for our error. If there should be anything that goes wrong with
        our fetch, we'll set the <code>error</code> in the state and use it to
        show some UI to the user. That way, no matter what happens, the user
        will always see something and the application will not crash.
      </p>
      <p>
        To do this, we'll need to move our fetching code inside of a try-catch
        block so that we can catch an error if something goes wrong. We'll also
        need to remember to reset the error state every time we call the{' '}
        <code>fetchListings</code> function, since a new request should clear
        the previous error. If an error occurs, we'll simply set a "Something
        went wrong. Please try again later." message in the <code>error</code>{' '}
        state.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[11, 16, 18, 19, 20, 21, 22, 23, 24, 25, 44, 45, 46]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithErrorCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageFetchWithFilters = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings', { params: filters });
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Adding filters to <code>HomePage</code>
      </h2>
      <p>
        Now that we have our <code>fetchListings</code> function working, we can
        start re-implementing the filters that we removed in the first step. The
        filters will now live as state in the <code>HomePage</code> and get
        passed to the <code>fetchListings</code> function. This makes our life
        easier because we no longer need to worry about filtering the listings
        ourselves. The mock API will handle that instead for us and all that we
        have to do is just pass it the data that it needs.
      </p>
      <p>
        We'll need to create a new state variable called <code>filters</code>.
        This will be an object with the 3 properties we've had previously:{' '}
        <code>dates</code>, <code>guests</code>, and <code>search</code>. We'll
        set the initial state to <code>undefined</code> for <code>dates</code>,{' '}
        <code>0</code> for the <code>guests</code>, and an empty string for{' '}
        <code>search</code>. We'll then pass those filters to our{' '}
        <code>fetchListings</code> function as params.
      </p>
      <p>
        Since we're now using the <code>filters</code> in our{' '}
        <code>fetchListings</code> function inside of the <code>useEffect</code>
        , we'll need to add it to the dependency array of the{' '}
        <code>useEffect</code>. Everything that is used inside a{' '}
        <code>useEffect</code> has to go in its dependency array. This will then
        cause the <code>fetchListings</code> function to re-run everytime{' '}
        <code>filters</code> changes, which is what we want.
      </p>
      <p>
        Finally, we need to re-implement our <code>handleFilters</code>{' '}
        function, which luckily for us is going to be really easy now! The only
        thing that we need to do is to set the filters that we receive from the{' '}
        <code>ListingFilters</code> component in the state of{' '}
        <code>HomePage</code>. Since we've added <code>filters</code> to the
        dependency array of our <code>useEffect</code>, the{' '}
        <code>fetchListings</code> function will be called automatically
        whenever they change.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[12, 13, 14, 15, 16, 24, 34, 37]}
        title='src/pages/HomePage.jsx'
      >
        {homePageFetchWithFilters}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithAbortControllerCode = `import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Implementing an AbortController in <code>HomePage</code>
      </h2>
      <p>
        Our data fetching is almost complete. However, we have one final missing
        piece. Let's think about another scenario that could happen. Currently,
        when the <code>HomePage</code> component mounts, it immediately fires
        the <code>fetchListings</code> function to get the first batch of{' '}
        <code>listings</code>. What happens if the user changes the{' '}
        <code>filters</code> before that fetch returns?
      </p>
      <p>
        Well, as we have it currently, a second <code>fetchListings</code>{' '}
        function will fire because changing the filters will trigger a re-render
        in the <code>useEffect</code>. This means that we'll have 2 fetch
        requests going on at the same time, which is not good. Even worse, if
        the first fetch request gets delayed for some reason and returns after
        the second one, it will override the results of the second one, which
        will cause the UI to be out of sync with the data. This is called a race
        condition and we need to prevent it.
      </p>
      <p>
        The way we are going to prevent it is by making sure that any pending
        request is cancelled before a new one is fired. This will guarantee us
        that there will only ever be one request in flight and that we'll always
        see the most up to date results.
      </p>
      <p>
        To do this, we'll use an <code>AbortController</code>, which we can use
        to abort a request. We're going to need to store this in the component.
        However, since we're not showing the controller anywhere in the UI, we
        can store it in a ref through the <code>useRef</code> hook to avoid it
        causing a re-render of our component whenever it changes.
      </p>
      <p>
        All of this will be done in the <code>useEffect</code>. Before every
        request we'll set a new <code>AbortController</code> in our ref, we'll
        then pass its <code>signal</code> object to our request, and then in the
        cleanup function of the effect we'll call the <code>abort</code>{' '}
        function to abort the request. This means that whenever we re-trigger
        the effect by updating <code>filters</code>, we will first cancel the
        previous request through the cleanup function, and we'll always have a
        new abort controller for our new request.
      </p>
      <p>
        One important thing to note is that our <code>api</code>, and thus{' '}
        <code>axios</code> under the hood, will throw an error whenever a
        request is cancelled. This means that this error will be caught in the{' '}
        <code>catch</code> block of our code. In that case, we don't want to set
        an error in our state, we want to ignore it. To do that, we'll need to
        import <code>axios</code> and use the <code>isCancel</code> function on
        the error before setting our state. If the error comes from a
        cancellation, we ignore it.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 19, 26, 31, 34, 35, 36, 37, 46, 47, 48]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithAbortControllerCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardWithNewDataCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Updating <code>ListingCard</code> with new data
      </h2>
      <p>
        Now that we've completed our data fetching, we can make some changes to
        the <code>ListingCard</code> component to use it. Since we're now
        getting our <code>listings</code> from the <code>api</code>, we have
        access to some more data that we didn't have before. That's because the{' '}
        <code>api</code> will actually manipulate each <code>listing</code> and
        add some related data to it before returning it.
      </p>
      <p>
        We're going to add more details to the <code>ListingCard</code>{' '}
        component to use that data. We'll show the <code>listing</code>'s price,
        location, max number of guests, and in the next steps, we will also add
        all of its remaining images in an image carousel.
      </p>
      <p>
        To do that, we'll first need to import and use some components from the{' '}
        <code>src/components/ui</code> folder. We'll also be using some new
        icons from <code>lucide-react</code>. With those, we'll add some more
        details to the <code>CardContent</code> of <code>ListingCard</code>.
      </p>
      <p>
        We'll need to update the <code>ListingCard</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          1, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32,
        ]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithNewDataCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCardImages = ({ listing }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CarouselContent className='ml-0'>
        {listing.images.map((image, index) => (
          <CarouselItem key={image} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-md object-cover'
              src={getImageUrl(image)}
              alt={\`\${listing.name} Image \${index + 1}\`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && (
        <>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </>
      )}
    </Carousel>
  );
};

export default ListingCardImages;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingCardImages</code> component
      </h2>
      <p>
        The next thing that we need to do is to improve how we display the
        images of a listing. Currently, only the first image is shown and the
        others are ignored. We're going to change that by adding a nice image
        carousel to the <code>ListingCard</code> component.
      </p>
      <p>
        We're going to be creating a new component for this, which we'll call{' '}
        <code>ListingCardImages</code>. This component will use the{' '}
        <code>Carousel</code> component from the <code>src/components/ui</code>{' '}
        folder and will display all of the images of a listing.
      </p>
      <p>
        We'll have this component take in a <code>listing</code> as props, and
        use it to map over each of the images and render a carousel. We'll use
        the same <code>img</code> tag as we had previously for each item, but
        we'll integrate it into <code>CarouselItem</code> component.
      </p>
      <p>
        We'll also want to render some buttons to navigate between the different
        images. These buttons will use the <code>CarouselPrevious</code> and{' '}
        <code>CarouselNext</code> components. These will all work together
        because <code>Carousel</code> is a compount component and each of the
        components belong within it.
      </p>
      <p>
        The last thing that we need to do is to only show the previous and next
        buttons if the user is currently hovering over the carousel. That way,
        we keep our UI clean without losing functionality. To do this we'll need
        to create a new state variable called <code>isHovering</code>, and we'll
        need to update it using the <code>onMouseEnter</code> and{' '}
        <code>onMouseLeave</code> event handlers on the <code>Carousel</code>.
      </p>
      <p>
        We'll need to create a new file inside the <code>src/components</code>{' '}
        directory called <code>ListingCardImages.jsx</code> with the following
        code:
      </p>
      <CodeHighlighter title='src/components/ListingCardImages.jsx'>
        {listingCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardWithListingCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <ListingCardImages listing={listing} />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Updating <code>ListingCard</code> with <code>ListingCardImages</code>
      </h2>
      <p>
        The last thing that we need to do is to add our new{' '}
        <code>ListingCardImages</code> component to the <code>ListingCard</code>{' '}
        so that our image carousel can be shown. We'll do this by importing the{' '}
        <code>ListingCardImages</code> component and rendering it inside of the{' '}
        <code>ListingCard</code> component.
      </p>
      <p>
        We'll replace the existing <code>img</code> tag that we had previously
        for the first image, and we'll use the <code>ListingCardImages</code>{' '}
        component instead. We'll have to pass it the <code>listing</code> as
        props for it to work correctly.
      </p>
      <p>
        We'll need to update the <code>ListingCard</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithListingCardImagesCode}
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
        Congratulations! You've successfully completed the 3rd module of the
        course. Your listings should now be fetched through our mock API, you
        should have loading and error states handled, as well as successfully
        prevented race conditions! If your code is not working as expected, you
        can always refer to the solution on GitHub using the link above. You can
        also post on the Discord and some one will help you figure it out!
      </p>
      <p>
        In this module we've learnt how to work APIs, how to fetch data with{' '}
        <code>useEffect</code>, how to handle loading and error states, and how
        to use abort controllers to prevent race conditions. We've also worked
        with refs and seen how we can work with them as an alternative to state
        when we don't need to show the value in the UI.
      </p>
      <p>
        Make sure you followed the steps correctly, as the next module will pick
        up right where we left off.
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>4-routes-and-navigation</code> from the dropdown above. See you
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
