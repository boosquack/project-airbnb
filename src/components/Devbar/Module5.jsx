import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Create the <code>useFetch</code> custom hook',
  'Refactor <code>HomePage</code> with <code>useFetch</code>',
  'Prevent an infinite loop in <code>HomePage</code> with <code>useMemo</code>',
  'Prevent unnecessary re-renders of <code>ListingFilters</code> with <code>useCallback</code>',
  'Wrap <code>ListingFilters</code> with <code>memo</code>',
  'Refactor the <code>ListingDetailsPage</code> with <code>useFetch</code>',
  'Create the <code>DataRenderer</code> component',
  'Update <code>HomePage</code> with <code>DataRenderer</code>',
  'Update <code>ListingDetailsPage</code> with <code>DataRenderer</code>',
  'Add cache support to <code>useFetch</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 5 - Hooks and Performance</h2>
      <Separator className='mb-2' />
      <p>
        In this module we will focus on optimizations and refactoring our code
        instead of adding new features. We will learn how to think in React and
        apply React best practices. We will improve the performance of our code
        and components, and we will also get rid of some of the repeated code
        that we've added so far.
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        Currently, we have a lot of repeated code in our application. We have
        the same code that fetches data in both the <code>HomePage</code> and{' '}
        <code>ListingDetailsPage</code> components, we're handling our error and
        loading states in the same way, and we even created the same custom
        render functions that render our data in both components! It's time to
        optimize and refactor.
      </p>
      <p>
        To do that, we're going to do two things. First, we'll create a custom
        hook to handle our data fetching in any component. We'll extract the
        code for fetching, loading, and errors into it. Second, we're going to
        create a component to automatically render our data while also
        accounting for errors and loading. We'll be able to use that component
        instead of our own custom render functions in each component. Also, as a
        bonus, while we're refactoring our code, we'll encounter the need to use{' '}
        <code>useMemo</code> and <code>useCallback</code> to improve the
        performance of our app.
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

const useFetchCode = `import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, url]);

  return { data, error, isLoading };
};

export default useFetch;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Creating the <code>useFetch</code> custom hook
      </h2>
      <p>
        Our code is getting a bit messy. We have repeated code in two places: in
        <code>HomePage</code> and in <code>ListingDetailsPage</code>. Both
        components fetch some data, handle the loading and error states, and
        finally display the data using a custom function all in the same way.
        This is a great use case for a custom re-usable hook!
      </p>
      <p>
        What we can do to improve this is to create a custom hook to handle all
        of the data fetching that we can re-use in both components. We'll call
        it <code>useFetch</code> and we'll have it take in a <code>url</code> to
        fetch and some optional <code>options</code> to pass through to the{' '}
        <code>api</code>. This hook will have the same functionality that we
        currently have in both components.
      </p>
      <p>
        Our <code>useFetch</code> hook will have a <code>useEffect</code> that
        will fetch the data based on the provided <code>url</code>, it will have
        and manage its own loading and error states, handle race conditions
        through an <code>AbortController</code>, and finally return an object
        with 3 properties: <code>data</code>, <code>error</code>, and{' '}
        <code>isLoading</code> to use in the component.
      </p>
      <p>
        We'll need to create a new file in the <code>src/hooks</code> folder
        called <code>useFetch.js</code> with the following code:
      </p>
      <CodeHighlighter title='src/hooks/useFetch.js'>
        {useFetchCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithUseFetchCode = `import { useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', { params: filters });

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

export const Step2 = () => {
  return (
    <div>
      <h2>
        Refactoring <code>HomePage</code> with <code>useFetch</code>
      </h2>
      <p>
        Now that we created our <code>useFetch</code> hook, we can refactor the{' '}
        <code>HomePage</code> to use it and get rid of some code. This is going
        to make our <code>HomePage</code> component a lot smaller and easier to
        work with.
      </p>
      <p>
        We'll get rid of the <code>error</code> and <code>isLoading</code>{' '}
        states, since they'll now be handled by our custom hook. We'll also get
        rid of the <code>listings</code> state and the <code>useEffect</code>{' '}
        that fetches our listings since they are no longer needed anymore.
      </p>
      <p>
        We can replace all of that with the values returned from{' '}
        <code>useFetch</code>. To keep our component working as it was before,
        we'll need to alias <code>data</code> to <code>listings</code>, and also
        access the <code>error</code> and <code>isLoading</code> values. We'll
        also need to pass the <code>filters</code> as params through the second
        argument of <code>useFetch</code>.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[6, 15, 16, 17, 18, 19]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseFetchCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithUseMemoCode = `import { useMemo, useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

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

export const Step3 = () => {
  return (
    <div>
      <h2>
        Preventing an infinite loop in <code>HomePage</code> with{' '}
        <code>useMemo</code>
      </h2>
      <p>
        We've just simplified our <code>HomePage</code> component, which is
        great! But there's a problem. With our refactoring, it seems that we've
        introduced a bug. The listings are now fetched over and over again in an
        infinite loop, which isn't good!
      </p>
      <p>
        The infinite loop is caused by the <code>options</code> argument that we
        passed to <code>useFetch</code>. Those <code>options</code> get passed
        as dependencies to the <code>useEffect</code> hook inside{' '}
        <code>useFetch</code>. In React, non-primitive values such as arrays and
        objects are not stable across re-renders. They are re-created and get a
        different identity, which will cause a <code>useEffect</code> hook to
        consider its dependencies to have changed.
      </p>
      <p>
        When the dependencies of a <code>useEffect</code> change, the code
        inside of it will re-run. This is what's happening. The{' '}
        <code>fetchData</code> function inside of <code>useFetch</code> is
        getting triggered on every render and is causing an infinite loop.
      </p>
      <p>
        The solution is to use the <code>useMemo</code> hook from React, which
        will allow us to create a variable that will be the same on every
        render, unless we want it to change. This is called a stable reference.
        Then, we can pass that variable to <code>useFetch</code> instead of the
        <code>options</code> object directly.
      </p>
      <p>
        We can simply create a new variable, <code>fetchOptions</code> with the
        same object as we had previously, but now instead we wrap it in{' '}
        <code>useMemo</code>. Since <code>fetchOptions</code> uses and depends
        on <code>filters</code>, we need to provide <code>filters</code> to the
        dependency array of
        <code>useMemo</code>. This will keep our <code>fetchOptions</code>{' '}
        stable across re-renders, except when <code>filters</code> changes.
      </p>
      <p>
        We'll need to change the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 15, 21]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseMemoCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithUseCallbackCode = `import { useCallback, useMemo, useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

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
        Preventing unnecessary re-renders of <code>ListingFilters</code> with{' '}
        <code>useCallback</code>
      </h2>
      <p>
        Since we're refactoring the <code>HomePage</code> component, let's make
        another small improvement to our code. Right now, everytime the{' '}
        <code>HomePage</code> re-renders, the <code>ListingFilters</code>{' '}
        component also re-renders. That's because in React parent components
        cause the re-render of child components.
      </p>
      <p>
        Let's think about when <code>HomePage</code> re-renders. It renders
        first once on mount, then we have a fetch that happens, and when that
        returns, <code>HomePage</code> will re-render with the{' '}
        <code>listings</code> and <code>isLoading</code> set to{' '}
        <code>false</code>. That's total of 2 renders that will repeat everytime
        we trigger a fetch.
      </p>
      <p>
        Usually, re-renders aren't a problem. But it's always better to try to
        avoid them when possible. In our case, we have a{' '}
        <code>handleFilters</code> function that is passed to the{' '}
        <code>ListingFilters</code> component. That function is re-created on
        every render, since it isn't a stable reference. What this will do is it
        will also cause the re-render of <code>ListingFilters</code> because its
        props have now changed.
      </p>
      <p>
        Because <code>ListingFilters</code> doesn't care about anything from the{' '}
        <code>HomePage</code> besides the <code>onChange</code> callback
        function it receives, we should prevent it from re-rendering when the{' '}
        <code>HomePage</code> does. This will help us save one render cycle and
        if ever in the future we build more onto <code>HomePage</code>, we'll be
        guaranteed that we won't affect performance by over-rendering{' '}
        <code>ListingFilters</code>.
      </p>
      <p>
        We can fix this problem by wrapping our <code>handleFilters</code>{' '}
        function with <code>useCallback</code>. This will make the function
        become a stable reference, and it will no longer cause a re-render
        unless its dependency array changes. And since it doesn't currently
        depend on anything, that dependency array will be empty.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 23, 24, 25]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithUseCallbackCode}
      </CodeHighlighter>
    </div>
  );
};

const listingsFiltersWithMemoCode = `import { Search } from 'lucide-react';
import { memo, useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = ({ onChange }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default memo(ListingFilters);`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Wrapping <code>ListingFilters</code> with <code>memo</code>
      </h2>
      <p>
        To make our <code>useCallback</code> change in the previous step
        effective, we need to wrap <code>ListingFilters</code> with{' '}
        <code>memo</code>. This will make it only re-render when its props have
        changed. If we don't do this, then even with <code>useCallback</code> it
        would still re-render because React doesn't by default check the props
        of a component before deciding whether or not to re-render it.
      </p>
      <p>
        The only thing that we need to do to fix this is import{' '}
        <code>memo</code> from <code>React</code> and at the bottom of the file
        where we export the component, we wrap the export with <code>memo</code>
        . This will automatically make <code>ListingFilters</code> check its own
        props before deciding whether or not to re-render.
      </p>
      <p>
        In React, you always need to wrap your components with <code>memo</code>{' '}
        whenever you apply <code>useCallback</code> or <code>useMemo</code> to
        try to prevent re-renders. Using <code>memo</code> is going to make sure
        that you components always check their props for equality before
        re-rendering, and without it those hooks won't be effective!
      </p>
      <p>
        We'll need to update the <code>ListingFilters</code> component with the
        following code:
      </p>

      <CodeHighlighter
        highlightedLines={[2, 37]}
        title='src/components/ListingFilters.jsx'
      >
        {listingsFiltersWithMemoCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsWithUseFetchCode = `import { useParams } from 'react-router-dom';

import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(${'`/api/listings/${listingId}`'});

  const renderListing = () => {
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

    return <ListingDetailsCard listing={listing} />;
  };

  return <div className='container py-4'>{renderListing()}</div>;
};

export default ListingDetailsPage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Refactoring the <code>ListingDetailsPage</code> with{' '}
        <code>useFetch</code>
      </h2>
      <p>
        Now that the <code>HomePage</code> is done, let's do the same thing to
        the <code>ListingDetailsPage</code> component. We'll need to get rid of
        the <code>error</code> and <code>isLoading</code> states, and we'll also
        get rid of the <code>listing</code> state and the <code>useEffect</code>{' '}
        that fetches our listing. Everything will be handled by the custom hook
        once again.
      </p>
      <p>
        This time we won't need to pass any options to <code>useFetch</code>{' '}
        since all we need is the <code>listingId</code> and that is passed
        through the <code>url</code> directly. This also means we won't need to
        use <code>useMemo</code> here. And since this component doesn't pass
        anything to its children, we also don't need to worry about{' '}
        <code>useCallback</code>.
      </p>
      <p>
        We'll need to update the <code>ListingDetailsPage</code> component with
        the following code:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 10, 11, 12, 13, 14]}
        title='src/pages/ListingDetailsPage.jsx'
      >
        {listingDetailsWithUseFetchCode}
      </CodeHighlighter>
    </div>
  );
};

const dataRendererCode = `import { Spinner } from '@/components/ui';

const DataRenderer = ({ children, error, isLoading }) => {
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

  return children;
};

export default DataRenderer;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Creating the <code>DataRenderer</code> component
      </h2>
      <p>
        Let's now make another refactor to our code. Whenever we fetch some data
        to display in the <code>HomePage</code> and the{' '}
        <code>ListingDetailsPage</code>, we manually create a helper function to
        render some UI for the loading and error states each time. This is great
        for the user experience, but we end up repeating the same logic in both
        components once again. Just like we did for the fetching, let's now
        refactor this to create a re-usable component that we can use in both
        pages to render our UI.
      </p>
      <p>
        Creating a custom component for this is a good idea because this is a
        pattern that we will probably use in multiple places as the app grows.
        Whenever you find yourself repeating code like this, it's always a good
        idea to ask yourself if it would make more sense to abstract that into a
        re-usable hook or component.
      </p>
      <p>
        We can create a custom <code>DataRenderer</code> component that will
        accept 3 props: <code>children</code>, <code>error</code>, and{' '}
        <code>isLoading</code>. We can then put our error and loading handling
        logic in there, just as we did in our custom render functions.
      </p>
      <p>
        We'll need to create a new file inside <code>components</code> called{' '}
        <code>DataRenderer.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/DataRenderer.jsx'>
        {dataRendererCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithDataRendererCode = `import { useCallback, useMemo, useState } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Updating <code>HomePage</code> with <code>DataRenderer</code>
      </h2>
      <p>
        Now that we have our <code>DataRenderer</code> component, we can update{' '}
        <code>HomePage</code> with it and get rid of the render function since
        our new component will now handle that. All that we need to do is to
        pass our <code>error</code> and <code>isLoading</code> states to it and
        it will handle the rest automatically!
      </p>
      <p>
        The benefit of doing it this way is that now our <code>HomePage</code>{' '}
        component is really small and simple compared to how it was before. It's
        much more manageable and easier to work with. All that it does is it
        just holds the data fetching <code>useFetch</code> hook along with the
        filters, and defers everything else to other components.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 34, 35, 36]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithDataRendererCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsWithDataRendererCode = `import { useParams } from 'react-router-dom';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(${'`/api/listings/${listingId}`'});

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Updating <code>ListingDetailsPage</code> with <code>DataRenderer</code>
      </h2>
      <p>
        Just like we did with <code>HomePage</code>, we will also now do to the{' '}
        <code>ListingDetailsPage</code>. We'll get rid of the custom render
        function, and just use <code>DataRenderer</code> instead and pass to it
        the <code>error</code> and <code>isLoading</code> states.
      </p>
      <p>
        This component was already pretty small, but now with these changes it
        will be even smaller and easier to manage. That's how most of your
        components should look like in a React application! Having small
        components like these scales really well and makes it easy to work with
        your codebase over time.
      </p>
      <p>
        We'll need to update the <code>ListingDetailsPage</code> component with
        the following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 18, 19, 20]}
        title='src/pages/ListingDetailsPage.jsx'
      >
        {listingDetailsWithDataRendererCode}
      </CodeHighlighter>
    </div>
  );
};

const useFetchWithCacheCode = `import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }

    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storageKey);

      if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, storageKey, url]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Adding cache support to <code>useFetch</code>
      </h2>
      <p>
        Let's make one final optimisation. Let's add caching support to{' '}
        <code>useFetch</code>. As it stands currently, everytime we navigate to
        the <code>HomePage</code> or the <code>ListingDetailsPage</code> we
        fetch the data from the API and we see a loading spinner. This is
        annoying because it happens even when we navigate to either screen even
        if we've just fetched the data a few seconds ago.
      </p>
      <p>
        Ideally, we should save the fetched data in a cache and have a threshold
        of time after which we consider the data stale, and only when that
        threshold has been crossed would we fetch the data again. This way, if
        we've recently fetched the data already, we can show it from the cache
        immediately and have a better user experience.
      </p>
      <p>
        To do this, we'll use the <code>localStorage</code> as our cache and
        store our data there. We'll also store a <code>lastFetched</code>{' '}
        variable that will allow us to check how long ago was the data last
        fetched. Finally, we'll use the <code>localStorage</code> utils to
        implement caching in <code>useFetch</code>.
      </p>
      <p>
        We'll need to check for the <code>lastFetched</code> value from the{' '}
        <code>localStorage</code> if it exists, and then returned the cached
        data if it's been less than <code>STALE_TIME</code>. Then we'll create
        another <code>useEffect</code> to store the cached data along with{' '}
        <code>lastFetched</code> everytime <code>data</code> changes.
      </p>
      <p>
        We'll need to update the <code>useFetch</code> hook with the following
        code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          2, 5, 7, 16, 17, 18, 19, 20, 21, 22, 26, 27, 29, 30, 31, 32, 33, 64,
          65, 66, 67, 68, 69, 70, 71,
        ]}
        title='src/hooks/useFetch.js'
      >
        {useFetchWithCacheCode}
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
        Congratulations! You've successfully completed the 5th module of the
        course. The app should now be working exactly as we had it before, but
        with a few improvements. You should now have a fully working cache for
        fetching that is based on the url and params, and the code should be
        much simpler, easier to work with, and much more efficient! If your code
        is not working as expected, you can always refer to the solution on
        GitHub using the link above. You can also post on the Discord and some
        one will help you figure it out!
      </p>
      <p>
        In this module we've learnt how to think in React and apply React best
        practices while refactoring our components. We've learnt how to improve
        performance with <code>useMemo</code> and <code>useCallback</code>,
        we've learnt how to create custom hooks such as <code>useFetch</code>,
        and even to extract shared functionality into custom components such as{' '}
        <code>DataRenderer</code>!
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>6-state-management</code> from the dropdown above. See you there!
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
