import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Create the <code>HomePage</code> component',
  'Add <code>HomePage</code> to <code>App</code>',
  'Create the <code>ListingList</code> component',
  'Create the <code>ListingCard</code> component',
  'Update <code>ListingList</code> with <code>ListingCard</code>',
  'Update <code>HomePage</code> with <code>ListingList</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 1 - React Fundamentals</h2>
      <Separator className='mb-2' />
      <p>
        In this module, we will embark on an exciting journey into the world of
        React. We will be building our own listing platform similar to
        Booking.com and Airbnb, and implementing most of their core features.
      </p>
      <p>
        Our application will have listings that users can view, filter them by
        availability, set the number of guests, add them to favorites, and much
        more. We'll start small and build up our app's complexity as we progress
        through the modules.
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        The goal of this module is to learn the basics of React and set up the
        foundation for our app. We'll be working with components, JSX,
        conditional rendering, iterating, and props.
      </p>
      <p>
        We'll start by creating a home page that will render a static list of
        listings. We'll create some components to help us render those listings,
        and set them up to be reusable. We'll also learn how to use some
        components from the <code>src/components/ui</code> folder to make things
        a little easier for us.
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

const homePageCode = `const HomePage = () => {
  return <div className='container py-4'>Hello World!</div>;
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Creating the <code>HomePage</code> component
      </h2>
      <p>
        Let's start by creating the home page. This page is important because
        it's the first page that users will land on when they visit our app. To
        do that, we'll need to create our first page component,{' '}
        <code>HomePage</code>.
      </p>
      <p>
        Page components go in the <code>src/pages</code> directory. This is
        where all of our pages will live. The <code>HomePage</code> will be
        responsible for rendering the list of listings but for now, it will just
        render a simple <code>div</code> with some styles and a "Hello World!"
        message.
      </p>
      <p>
        We'll apply some basic styles to our component, such as the{' '}
        <code>container</code> class and some padding. As we progress through
        the course, we'll want to apply these styles to any page component that
        we build to ensure a consistent UI in our application.
      </p>
      <p>
        We'll need to create a new file inside the <code>src/pages</code>{' '}
        directory called <code>HomePage.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/pages/HomePage.jsx'>
        {homePageCode}
      </CodeHighlighter>
    </div>
  );
};

const appWithHomePageCode = `import Devbar from '@/components/Devbar/Devbar';
import HomePage from '@/pages/HomePage';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <HomePage />
      </div>
    </>
  );
};

export default App;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Adding <code>HomePage</code> to <code>App</code>
      </h2>
      <p>
        Now that we have our <code>HomePage</code> component, we need to add it
        to our <code>App</code> component. This is the main component that is be
        rendered when our app loads. Currently, it's the root of our application
        and is also where the <code>Devbar</code> component lives.
      </p>
      <p>
        We'll need to import <code>HomePage</code> and add it to the{' '}
        <code>App</code> component inside the <code>div</code> with the{' '}
        <code>ml-[700px]</code> class. This will make sure that the{' '}
        <code>Devbar</code> remains visible on the left side of the screen,
        while displaying the content on the right.
      </p>
      <p>
        We'll need to update the <code>App</code> component with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[2, 11]} title='src/App.jsx'>
        {appWithHomePageCode}
      </CodeHighlighter>
    </div>
  );
};

const listingListCode = `const ListingList = () => {
  return <div>Listings go here!</div>;
};

export default ListingList;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingList</code> component
      </h2>
      <p>
        Let's now create our second component, <code>ListingList</code>. This
        component will be responsible for rendering the list of listings. These
        are the listings that our users can browse through. For now, since we
        don't have any listings to show, we'll just render a simple "Listings go
        here!" message in our component.
      </p>
      <p>
        The <code>ListingList</code> is what we call a feature component. It
        will handle the feature of displaying our listings. Since this is
        feature component, it will go in the root of the{' '}
        <code>src/components</code> folder, right beside all of our UI
        components in the <code>ui</code> folder.
      </p>
      <p>
        We'll need to create a new file inside the <code>src/components</code>{' '}
        directory called <code>ListingList.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/ListingList.jsx'>
        {listingListCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardCode = `import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='p-4'>
        <h2 className='mb-0 text-xl font-semibold'>{listing.name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingCard</code> component
      </h2>
      <p>
        Let's create our third component, <code>ListingCard</code>. This
        component will be responsible for rendering a single listing. Here we're
        going to import and use some of the components from the{' '}
        <code>src/components/ui</code> folder to make things a little easier for
        us.
      </p>
      <p>
        This component will also be a feature component, which means that it
        will also go in the root of the <code>src/components</code> folder,
        right next to the <code>ListingList</code> component that we built in
        the previous step.
      </p>
      <p>
        This is also the first component where we need to have it take in some
        props. Since we're going to be rendering a single listing, we'll need to
        have this component receive a <code>listing</code> as props. We'll then
        be able to use that <code>listing</code> in this component to render the
        listing's main image and name.
      </p>
      <p>
        For the image, we are going to use the <code>getImageUrl</code> function
        from the images utility file in the <code>src/utils</code> folder. This
        function will provide us with a URL for the image that we can use to
        show it. Each listing has multiple images, but for now we will only use
        the first image. Later on we will update this to have an image slider
        with all of the images.
      </p>
      <p>
        We'll need to create a new file inside the <code>src/components</code>{' '}
        directory called <code>ListingCard.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/ListingCard.jsx'>
        {listingCardCode}
      </CodeHighlighter>
    </div>
  );
};

export const listingListWithListingCardCode = `import ListingCard from '@/components/ListingCard';

const ListingList = ({ listings }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingList;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Updating <code>ListingList</code> with <code>ListingCard</code>
      </h2>
      <p>
        Great! Now that we have all of the components we need, let's put them
        all together and render them! The first thing that we need to do is to
        replace the "Listings go here!" message in the <code>ListingList</code>{' '}
        component with the <code>ListingCard</code> component that we just
        created.
      </p>
      <p>
        To do that, we'll need some <code>listings</code> to loop over and
        render the <code>ListingCard</code> for each. We're going to have these
        listings come get passed down from the <code>HomePage</code>, so we'll
        need to update our <code>ListingList</code> component to accept{' '}
        <code>listings</code> as props.
      </p>
      <p>
        We'll also need to make a check for the length of the{' '}
        <code>listings</code>, since it can happen that we receive an empty
        list. If there are no listings to show, we'll render a simple "No
        listings found." message. Otherwise we'll map over the{' '}
        <code>listings</code> and render the <code>ListingCard</code> for each,
        passing the current <code>listing</code> as props.
      </p>
      <p>
        Since we're mapping over a list, we need to handle the <code>key</code>{' '}
        prop that is mandatory in React. We'll use the <code>id</code> of each
        listing as its key since it will be unique and won't cause duplicates.
        Handling keys properly in React is really important!
      </p>
      <p>
        We'll need to update the <code>ListingList</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 5, 6, 7, 8, 9, 10, 11, 12]}
        title='src/components/ListingList.jsx'
      >
        {listingListWithListingCardCode}
      </CodeHighlighter>
    </div>
  );
};

const homePageWithListingListCode = `import { listings } from '@/api/data/listings';
import ListingList from '@/components/ListingList';

const HomePage = () => {
  return (
    <div className='container py-4'>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Updating <code>HomePage</code> with <code>ListingList</code>
      </h2>
      <p>
        The last step that we need to do is to replace the "Listings go here!"
        message in the <code>HomePage</code> with the <code>ListingList</code>{' '}
        component, and pass it some <code>listings</code> through props.
      </p>
      <p>
        We can use the listings that are defined inside{' '}
        <code>src/api/data/listings</code>. We can import them directly in the{' '}
        <code>HomePage</code> and pass them to <code>ListingList</code> to
        render. For now, this is going to be a static list of listings. In later
        modules we'll update this to be more dynamic and actually fetch them
        from the <code>localStorage</code> database.
      </p>
      <p>
        One thing to note is that we could've imported the listings directly
        inside <code>ListingList</code> without having to pass them through{' '}
        <code>HomePage</code>. Having them here however is better because it
        should be the responsibility of <code>HomePage</code> to own the{' '}
        <code>listings</code>. <code>ListingList</code> will then have the
        responsibility to render them through <code>ListingCard</code>, and{' '}
        <code>ListingCard</code> will actually render each listing.
      </p>
      <p>
        We'll need to update the <code>HomePage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 7]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithListingListCode}
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
        Congratulations! You've completed the 1st module of the course. You
        should now have the listings rendered nicely on the home page, using the
        components that we've built in this module! If your code is not working
        as expected, you can always refer to the solution on GitHub using the
        link above. You can also post on the Discord and some one will help you
        figure it out!
      </p>
      <p>
        In this module we've learnt the basics of React, how to create
        components, and set up the base of our listing platform! We now have
        everything that we need to make our application dynamic by adding state!
      </p>
      <p>
        Make sure you followed the steps correctly, as the next module will pick
        up right where we left off.
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>2-state-and-event-handlers</code> from the dropdown above. See you
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
