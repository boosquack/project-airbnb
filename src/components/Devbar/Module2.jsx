import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Convert the static <code>listings</code> in <code>HomePage</code> to state',
  'Create the <code>ListingFilters</code> component',
  'Add state and event handlers to <code>ListingFilters</code>',
  'Add a callback prop to <code>ListingFilters</code>',
  'Add <code>ListingFilters</code> to <code>HomePage</code>',
  'Create a callback to update the filters in <code>HomePage</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 2 - State and Event Handlers</h2>
      <Separator className='mb-2' />
      <p>
        In this module, we'll be working with state and adding some stateful
        variables to our application. We will also be working with event
        handlers to allow our users to interact with our application.
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        The goal for this module is to learn how to work with state and to bring
        our application to life by making it stateful. State allows things to
        change over time and is a very important part of any application. And to
        be able to change state, we'll need to learn and work with event
        handlers.
      </p>
      <p>
        We'll start by converting our <code>listings</code> to state, which will
        allow the <code>listings</code> to change over time. Then, we'll create
        a function that can filter the <code>listings</code> and replace them
        with the ones that match the filter criteria. Finally, we'll be adding
        some inputs to allow the user to change the <code>listings</code> state.
      </p>
      <p>
        We'll need to create a new component called <code>ListingFilters</code>{' '}
        which will handle the filters and render some components to allow users
        to filter the listings by searching for their name, selecting a date
        range, and adding a number of guests. We'll then add this component to
        the <code>HomePage</code> and use it to filter the listings in the{' '}
        <code>HomePage</code> component.
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

const homePageCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingList from '@/components/ListingList';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Converting the static <code>listings</code> in <code>HomePage</code> to
        state
      </h2>
      <p>
        The first thing that we need to do is to make our <code>listings</code>{' '}
        stateful. Currently, we're importing the <code>listings</code> directly
        from the <code>src/api/data/listings</code> file, which means that the{' '}
        <code>listings</code> are static and will never change.
      </p>
      <p>
        To do that we'll make use of one of the most common hooks in React:{' '}
        <code>useState</code>. This hook will allow us to hold a state variable,
        as well as provide us with an updater function to update it. We can then
        call this function whenever we want to update our state.
      </p>
      <p>
        We'll need to use an alias while importing our listings, since we'll now
        have a new state variable called <code>listings</code> and we can't have
        duplicates. To keep it simple, we'll call the alias{' '}
        <code>staticListings</code>. Then, we can use the <code>useState</code>{' '}
        hook to create a state variable called <code>listings</code> and pass
        those static listings to it.
      </p>
      <p>
        With these changes, our app will function the same and there won't be
        any obvious difference. However, what we've now done is allowed our{' '}
        <code>listings</code> to dynamically change over time, which will allow
        us to add some functionality to change the displayed listings later on.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 7]}
        title='src/pages/HomePage.jsx'
      >
        {homePageCode}
      </CodeHighlighter>
    </div>
  );
};

const listingFiltersCode = `import { Search } from 'lucide-react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input className='w-[400px]' placeholder='Search destinations' />
      <DateRangePicker placeholder='Add dates' />
      <Stepper />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingFilters</code> component
      </h2>
      <p>
        Now that our listings are stateful in the <code>HomePage</code>, we can
        begin creating the components that will modify them. We'll need to add a
        search bar so our users can search a listing by its title, a date range
        picker to allow users to select their dates, a stepper input to allow
        users to select the number of guests, and finally we'll need a submit
        button to actually set the filters and update the listings.
      </p>
      <p>
        The best way to do that is to create a new component, which we'll call{' '}
        <code>ListingFilters</code>. Creating a new component for this is a good
        idea because we can encapsulate the entire logic and UI for the filters
        in one place, and then we can simply use that component in the{' '}
        <code>HomePage</code>.
      </p>
      <p>
        Here we're also going to use some handy components from the{' '}
        <code>src/components/ui</code> folder. We have an <code>Input</code>{' '}
        component, a <code>DateRangePicker</code> component, a{' '}
        <code>Stepper</code> component, and the <code>Button</code> component.
        We'll also use the <code>Search</code> icon from{' '}
        <code>lucide-react</code>.
      </p>
      <p>
        We'll need to create a new file inside the <code>src/components</code>{' '}
        directory called <code>ListingFilters.jsx</code> with the following
        code:
      </p>
      <CodeHighlighter title='src/components/ListingFilters.jsx'>
        {listingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};

const listingFiltersWithState = `import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

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
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Adding state and event handlers to <code>ListingFilters</code>
      </h2>
      <p>
        Our <code>ListingFilters</code> component currently doesn't do anything
        besides render some UI. We need to change that and add some state and
        event handlers to it, so that we can actually use it to filter our
        listings.
      </p>
      <p>
        We'll need to create 3 state variables: <code>dates</code>,{' '}
        <code>guests</code>, and <code>search</code>. We'll pass{' '}
        <code>dates</code> to the <code>DateRangePicker</code>,{' '}
        <code>guests</code> to the <code>Stepper</code>, and we'll pass{' '}
        <code>search</code> to the <code>Input</code> component. We're also
        going to pass the updater functions to those components, so that they
        can update the state variables.
      </p>
      <p>
        For the <code>Input</code> we'll need to access the{' '}
        <code>e.target.value</code> property and set that in the state, for the{' '}
        <code>Stepper</code> we'll pass the <code>setGuests</code> function
        directly, and for the <code>DateRangePicker</code> we'll simply pass it{' '}
        <code>setDates</code> since it is already configured to return the
        correct data. The dates will be an object with <code>from</code> and{' '}
        <code>to</code> as properties.
      </p>
      <p>
        Also, we need to add the <code>minDate</code> property to{' '}
        <code>DateRangePicker</code> with a value of the current date, so that
        we don't allow users to select dates in the past! We won't limit dates
        in the future, so users can book as far in advance as they want.
      </p>
      <p>
        We'll need to update the <code>ListingFilters</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 7, 8, 9, 16, 17, 20, 21, 22, 25]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithState}
      </CodeHighlighter>
    </div>
  );
};

const listingFiltersWithCallbacks = `import { Search } from 'lucide-react';
import { useState } from 'react';

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

export default ListingFilters;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Adding a callback prop to <code>ListingFilters</code>
      </h2>
      <p>
        Our <code>ListingFilters</code> component is looking good, but its state
        is self-contained. We currently don't have a way to send that state to
        the <code>HomePage</code> component, which is where we'll need to use
        it.
      </p>
      <p>
        It's important to understand that <code>HomePage</code> is responsible
        for filtering the <code>listings</code>, not <code>ListingFilters</code>{' '}
        component. It's the responsibility of <code>HomePage</code> because it
        holds the state for <code>listings</code>. <code>ListingFilters</code>{' '}
        will simply handle its own inner state, which it's responsible for, and
        only call the callback from <code>HomePage</code> with the filters.
      </p>
      <p>
        To pass the state upwards, we will need two things. We'll first need an{' '}
        <code>onChange</code> callback function that <code>HomePage</code> will
        pass to <code>ListingFilters</code>, and then we'll need a{' '}
        <code>handleSubmit</code> function that the <code>ListingFilters</code>{' '}
        will call when the <code>Button</code> is pressed. The{' '}
        <code>handleSubmit</code> function will then call the the{' '}
        <code>onChange</code> callback.
      </p>
      <p>
        The <code>handleSubmit</code> function will call the{' '}
        <code>onChange</code> callback with the current values of{' '}
        <code>dates</code>, <code>guests</code>, and <code>search</code>. We'll
        attach it to the <code>Button</code> so that whenever it is clicked, we
        send the state upwards for the <code>HomePage</code> to use.
      </p>
      <p>
        We'll need to update the <code>ListingFilters</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[6, 11, 12, 13, 30]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithCallbacks}
      </CodeHighlighter>
    </div>
  );
};

export const homePageWithListingFiltersCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Adding <code>ListingFilters</code> to <code>HomePage</code>
      </h2>
      <p>
        Now that our <code>ListingFilters</code> component is fully functional,
        we can plug it into the <code>HomePage</code>. We'll need to import the{' '}
        <code>ListingFilters</code> component into <code>HomePage</code>, and
        render it.
      </p>
      <p>
        We won't worry about passing the <code>onChange</code> callback just
        now, as we'll need to create it in the next step. But we'll need to
        handle the position and styles of <code>ListingFilters</code> so that it
        looks nice inside <code>HomePage</code>.
      </p>
      <p>
        We'll have <code>ListingFilters</code> sit at the top of the page, and
        we'll use a <code>Separator</code> from our{' '}
        <code>src/components/ui</code> folder to make a visual distinction
        between it and the rest of the page. This will make our filters visible
        at the top of the screen where users expect it.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 6, 13, 14, 15, 16]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithListingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};

export const homePageWithFiltersCallbackCode = `import { useState } from 'react';

import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    // Resets filters by using static listings
    let filteredListings = staticListings;

    // Handles date range
    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }

    // Handles guests
    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => guests <= listing.maxGuests,
      );
    }

    // Handles search
    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
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

export const Step6 = () => {
  return (
    <div>
      <h2>
        Creating a callback to update the filters in <code>HomePage</code>
      </h2>
      <p>
        Finally, we need to create and pass a callback function to the{' '}
        <code>ListingFilters</code> as its <code>onChange</code> prop. As we've
        seen, this callback will be called whenever the filters are submitted,
        and it will be passed the current values of <code>dates</code>,{' '}
        <code>guests</code>, and <code>search</code>.
      </p>
      <p>
        To create our callback function, which we'll call{' '}
        <code>handleFilters</code>, we'll need to have it take in the filters
        from <code>ListingFilters</code> and use them to update the{' '}
        <code>listings</code> state to only show listings which match the
        filters. We'll need to handle the <code>dates</code> value of the
        filters, the <code>guests</code> value, as well as the{' '}
        <code>search</code> value.
      </p>
      <p>
        First we'll need to check that the listing's title contains the{' '}
        <code>search</code>, then we'll check that the <code>guests</code> is
        smaller than the listing's <code>maxGuests</code> property, and then for
        the dates we'll use a handy helper function,{' '}
        <code>isListingAvailable</code>, to check if the dates are within the
        listing's availability. The function makes it easy for us to pass a{' '}
        <code>listing</code> and some <code>dates</code>, and it will tell us if
        the <code>listing</code> is available or not.
      </p>
      <p>
        Based on those results, we'll then filter the <code>listings</code> and
        only show the ones which match the filter criteria by updating the state
        through our updater function, <code>setListings</code>. This will
        automatically update our UI with only the <code>listings</code> that
        match our criteria!
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          4, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFiltersCallbackCode}
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
        Congratulations! You've completed the 2nd module of the course. The
        filters on the home page should now be fully working. Try selecting a
        date range, searching for a listing by its title, or selecting the
        number of guests and then pressing the button to submit your filters.
        This will filter your listings and only show you the listings that match
        the criteria you've selected! If your code is not working as expected,
        you can always refer to the solution on GitHub using the link above. You
        can also post on the Discord and some one will help you figure it out!
      </p>
      <p>
        In this module we've learnt how to work with state in React. We've added
        state to our home page listings, and created a new component to handle
        the filters. We've also learnt how to pass callbacks between components,
        and how to use them to update state in the parent. We've worked with
        event handlers, and have learnt how to use them to get a value in
        response to user input.
      </p>
      <p>
        Make sure you followed the steps correctly, as the next module will pick
        up right where we left off.
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>3-effects-and-data-fetching</code> from the dropdown above. See
        you there!
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
