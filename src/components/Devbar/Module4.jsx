import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Set up the <code>Router</code> component',
  'Replace <code>App</code> with <code>Router</code>',
  'Add <code>HomePage</code> as a child route',
  'Add an <code>Outlet</code> to <code>App</code>',
  'Create the <code>ListingDetailsCard</code> component',
  'Create the <code>ListingDetailsPage</code> component',
  'Add <code>ListingDetailsPage</code> to <code>Router</code>',
  'Add a details link to <code>ListingCard</code>',
  'Create the <code>ListingDetailsCardImages</code> component',
  'Add <code>ListingDetailsCardImages</code> to <code>ListingDetailsCard</code>',
  'Create the <code>NotFoundPage</code> component',
  'Add <code>NotFoundPage</code> to <code>router</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 4 - Routes and Navigation</h2>
      <Separator className='mb-2' />
      <p>
        In this module we'll be working with routes and navigation. We will
        learn how to work with <code>react-router-dom</code> to add navigation
        to our app, we'll then create router that will contain our routes and
        navigation structure for our application, and finally we'll add some new
        pages for users to navigate to.
      </p>
      <p>
        This module is very important because we're going to be fundamentally
        changing the structure of our application. We are going to replace the
        entry point of our application from rendering a single component as we
        have it currently, to rendering an entire router instead!
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        Currently, all of our listings are non-clickable. We show all of them on
        the home page, and even allow the user to filter them, but we don't
        allow them to click on a listing to view more information about it. This
        is not the best user experience.
      </p>
      <p>
        We can improve that by creating a new page that will show the details of
        a listing. The user can click into any listing and be redirected to that
        page, and then once they are done, they should be able to navigate back
        through their browser to the home page again. This will create for a
        much better user experience and will make our app feel a lot more alive.
      </p>
      <p>
        To do that, we'll need to learn about navigation in React and implement
        our own client-side routing solution. We'll be doing this with the
        library <code>react-router-dom</code>. We'll need to create our own
        router, define our routes, and structure the way our users will be able
        to navigate our application.
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

const routerCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Setting up the <code>Router</code> component
      </h2>
      <p>
        We're going to start by integrating <code>react-router-dom</code> into
        our application. The first step is to create a <code>Router</code>{' '}
        component where we will define our routes and how they are structured.
        This will become the new entrypoint to our application.
      </p>
      <p>
        We'll use the <code>createBrowserRouter</code> function from{' '}
        <code>react-router-dom</code> to create our router. Inside we'll define
        a simple route, <code>/</code>, that will render our <code>App</code>{' '}
        component. The <code>App</code> component is the component that is
        currently rendering our entire app, including the <code>Devbar</code>{' '}
        component where you are reading this right now. The router will map the
        index route of our app to the <code>App</code> component and whenever a
        user visits this page, it will be rendered.
      </p>
      <p>
        Then, we'll need to create a <code>Router</code> component that will use
        the <code>RouterProvider</code> from <code>react-router-dom</code> and
        pass it the <code>router</code> that we just created. We'll export this
        component so that we can use this in the next step to actually render
        our router.
      </p>
      <p>
        We'll need to create a new file inside the <code>src</code> directory
        called <code>Router.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/Router.jsx'>{routerCode}</CodeHighlighter>
    </div>
  );
};

const mainCode = `import ReactDOM from 'react-dom/client';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Router />
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Replacing <code>App</code> with <code>Router</code>
      </h2>
      <p>
        Now that we have created our <code>Router</code> component, we'll need
        to import it and add it as the main entry point to our app. We will
        replace <code>App</code> in the <code>render</code> method of{' '}
        <code>ReactDOM</code> so that our app's main entry point becomes our
        router.
      </p>
      <p>
        With these changes our <code>Router</code> now controls the entire app
        and decides what gets rendered. Since we've plugged the <code>App</code>{' '}
        component inside the <code>/</code> path, it will automatically be
        rendered through our <code>Router</code> whenever we are on the index of
        our app.
      </p>
      <p>
        We'll need to update the <code>main.jsx</code> file with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[6, 15]} title='src/main.jsx'>
        {mainCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithChildrenCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Adding <code>HomePage</code> as a child route
      </h2>
      <p>
        The next thing that we need to do is to make <code>App</code> be able to
        render dynamic content. As it stands currently, <code>App</code> is not
        capable of rendering dynamic content. We have the <code>HomePage</code>{' '}
        hard-coded into it. We should change that to allow any component to be
        rendered based on the current URL. We also want to keep the same styling
        as we currently have as well as render the dynamic content only on the
        right side of the screen, next to the <code>Devbar</code> component.
      </p>
      <p>
        Luckily, one of the great features about <code>react-router-dom</code>{' '}
        is the ability to have child routes. This will allow us to define a
        route that is a child of another route. When we navigate to that route,
        both the parent and the child route will be rendered. We can use{' '}
        <code>App</code> as the parent and any dynamic route as the child.
      </p>
      <p>
        To do that we'll have to add a new route inside of our{' '}
        <code>Router</code>, under the <code>children</code> property of the
        index route. We will give it the same path, <code>/</code>, and we'll
        use the <code>HomePage</code> component. This will render everything as
        we currently have, but through a child route in the <code>Router</code>.
      </p>
      <p>
        We'll need to update the <code>router</code> with the following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 11, 12, 13, 14, 15, 16]}
        title='src/Router.jsx'
      >
        {routerWithChildrenCode}
      </CodeHighlighter>
    </div>
  );
};

const appWithOutletCode = `import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <Outlet />
      </div>
    </>
  );
};

export default App;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Adding an <code>Outlet</code> to <code>App</code>
      </h2>
      <p>
        The next thing that we need to do is to remove <code>HomePage</code>{' '}
        inside of the <code>App</code> component and replace it with our new
        child route. Since we've now defined a child route for the{' '}
        <code>App</code> component, we need to tell{' '}
        <code>react-router-dom</code> where to render the child route.
      </p>
      <p>
        For this we'll make use of the <code>Outlet</code> component from{' '}
        <code>react-router-dom</code>. This component is the placeholder that{' '}
        <code>react-router-dom</code> will use to dynamically render a route
        within the content of another route. In our case, it will render any
        child of <code>App</code>.
      </p>
      <p>
        We are going to replace the hard-coded <code>HomePage</code> with the{' '}
        <code>Outlet</code> component so that we keep all of the same styling as
        we had before, as well as keep the <code>Devbar</code> visible at all
        times.
      </p>
      <p>
        We'll need to update the <code>App</code> component with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[1, 12]} title='src/App.jsx'>
        {appWithOutletCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsCardCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
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
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingDetailsCard</code> component
      </h2>
      <p>
        Now that our router is setup and working with nested routes, we can
        start adding some new pages to our application. We talked about adding a
        listing details page previously to allow the user to navigate to it and
        view more information about a listing, so let's do that!
      </p>
      <p>
        The first thing that we need to do is we need to create a component to
        show some details about a listing. This will be very similar to the{' '}
        <code>ListingCard</code> component that we created earlier, but it will
        have more information to display. It will also receive a{' '}
        <code>listing</code> as props, and simply render some UI for the
        listing.
      </p>
      <p>
        We are first going to start without any images. We are just going to
        render the <code>listing</code>'s name, price, location, max number of
        guests, and description. In later steps we'll be adding images as well,
        just like we did with <code>ListingCard</code>.
      </p>
      <p>
        We'll need to create a new file inside <code>src/components</code>{' '}
        called <code>ListingDetailsCard.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCard.jsx'>
        {listingDetailsCardCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsPageCode = `import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/api';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get(${'`/api/listings/${listingId}`'}, {
          signal: abortController.current?.signal,
        });
        setListing(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();

    return () => {
      abortController.current?.abort();
    };
  }, [listingId]);

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
        Creating the <code>ListingDetailsPage</code> component
      </h2>
      <p>
        Next up, let's create the listing details page. This will be the page
        component that we'll plug into our <code>router</code>, and it will
        render the <code>ListingDetailsCard</code> component that we just
        created in the previous step.
      </p>
      <p>
        Since our <code>ListingDetailsCard</code> component needs a{' '}
        <code>listing</code> to show, we'll need to fetch it in this page and
        pass it down. Just like we did in the <code>HomePage</code>, we'll need
        to fetch the listing in a <code>useEffect</code> as well as handle the{' '}
        loading and error states, and handle race conditions.
      </p>
      <p>
        To be able to fetch the right listing, we need to know the{' '}
        <code>listingId</code> to fetch. The API endpoint to fetch a single
        listing requires it. We can make use of params in{' '}
        <code>react-router-dom</code>. Params allows us to pass data from one
        route to another. This will allow us to pass a <code>listingId</code> to
        this route when we navigate to it.
      </p>
      <p>
        To access the <code>listingId</code> and any other params we can use the{' '}
        <code>useParams</code> hook from <code>react-router-dom</code>. This
        will give us access to any params that were passed to this route.
      </p>
      <p>
        We'll need to create a new file inside <code>src/pages</code> called{' '}
        <code>ListingDetailsPage.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/pages/ListingDetailsPage.jsx'>
        {listingDetailsPageCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithListingsDetailsCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Adding <code>ListingDetailsPage</code> to <code>Router</code>
      </h2>
      <p>
        With the <code>ListingDetailsPage</code> created, we can now add it to
        our <code>router</code> for it to be accessible in our app. We'll want
        to render this route as a child of our index route, right next to the{' '}
        <code>HomePage</code>. This will make sure that our navigation happens
        only between child routes, while still keeping <code>App</code> rendered
        with the <code>Devbar</code> component.
      </p>
      <p>
        The path for this page for the listing details page will be a path that
        contains a dynamic URL parameter, <code>listingId</code>. The path will
        be <code>/listings/:listingId</code>, which will match for any{' '}
        <code>listingId</code> that we provide. Doing it this way will give us
        access to the <code>listingId</code> through the route params, which
        we've accessed via <code>useParams</code> in the previous step.
      </p>
      <p>
        It's important to understand the relationship between the different
        routes and their paths. Currently, we've placed{' '}
        <code>ListingDetailsPage</code> under the main <code>/</code> index path
        where <code>App</code> is, and then specified{' '}
        <code>/listings/:listingId</code> as a path as well. The first path
        applies to the <code>App</code> component, which should render on any
        route since it holds the main layout for our app. The{' '}
        <code>ListingDetailsPage</code> component however, should only render on{' '}
        <code>/listings/:listing</code>. The result is that on every page we'll
        have <code>App</code> rendered, and any sub path we have defined will
        render the corresponding component inside the <code>Outlet</code> of{' '}
        <code>App</code>.
      </p>
      <p>
        We'll need to update the <code>Router.jsx</code> file with the following
        code:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 17, 18, 19, 20]}
        title='src/Router.jsx'
      >
        {routerWithListingsDetailsCode}
      </CodeHighlighter>
    </div>
  );
};

const listingCardWithLinkCode = `import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={${'`/listings/${listing.id}`'}}>
      <Card className='w-[320px]'>
        <ListingCardImages listing={listing} />
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

export const Step8 = () => {
  return (
    <div>
      <h2>
        Adding a details link to <code>ListingCard</code>
      </h2>
      <p>
        The last thing we need to do is to create a link from the{' '}
        <code>ListingCard</code> component to the{' '}
        <code>ListingDetailsPage</code>. This will make each listing in our home
        page clickable and redirect the user to the details page. Since we have
        access to the <code>listing</code> inside <code>ListingCard</code>, we
        can use that to pass the correct <code>listingId</code> to the URL.
      </p>
      <p>
        When using <code>react-router-dom</code> we need to use the{' '}
        <code>Link</code> component instead of a html <code>a</code> tag to
        create a link. This will allow us to have client-side routing which will
        not reload the page as it would with a normal <code>a</code> tag. The{' '}
        <code>Link</code> component takes a <code>to</code> property that is the
        same as the <code>href</code> in a normal link. We can pass a relative
        link and use string interpolation to send the <code>listingId</code>.
      </p>
      <p>
        You'll notice that we chose to have the <code>Link</code> wrap the
        entire <code>ListingCard</code> component. This is so that the entire
        card becomes clickable, as you would expect in a normal application.
        However, we could've also done it differently, for example by creating a
        button and only making that clickable instead. Either way is fine, and
        it's entirely preference at this point.
      </p>
      <p>
        We'll need to update the <code>ListingCard</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 9, 35]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithLinkCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingDetailsCardImages = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[currentImageIndex])}
        alt={listing.name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {listing.images.map((image, index) => (
            <CarouselItem
              key={image}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
              isSelected={index === currentImageIndex}
            >
              <img
                className='h-52 w-full object-cover shadow-sm'
                src={getImageUrl(image)}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Creating the <code>ListingDetailsCardImages</code> component
      </h2>
      <p>
        Great! Our routing works as expected and we can click any listing to
        navigate to its details page. Now, let's finish up the{' '}
        <code>ListingDetailsCard</code> component and add the images to it. Just
        like we did for the <code>ListingCard</code> images, we'll create a new
        component called <code>ListingDetailsCardImages</code> that will be
        responsible for rendering the images of a listing.
      </p>
      <p>
        <code>ListingDetailsCardImages</code> will use the same{' '}
        <code>Carousel</code> as we used in <code>ListingCardImages</code>, but
        will also keep track of the current image index and render the image in
        a larger size. This will allow the user to click on any image and see it
        in a larger size, and also navigate through the images using the
        carousel.
      </p>
      <p>
        We'll need to create a state variable called <code>currentIndex</code>{' '}
        to store the current selected image. Then, we'll pass{' '}
        <code>setCurrentIndex</code> to <code>CarouselItem</code>'s{' '}
        <code>onClick</code> event handler, setting the current index to the
        index of the clicked image.
      </p>
      <p>
        We'll need to create a new file inside <code>src/components</code>{' '}
        called <code>ListingDetailsCardImages.jsx</code> with the following
        code:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCardImages.jsx'>
        {listingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};

const listingDetailsCardWithListingDetailsCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='mb-4' />
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
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
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Adding <code>ListingDetailsCardImages</code> to{' '}
        <code>ListingDetailsCard</code>
      </h2>
      <p>
        Now that we have our <code>ListingDetailsCardImages</code> component, we
        need to add it to our <code>ListingDetailsCard</code> component to show
        all of the images. We'll add it right at the top of the card, so that
        it's the first thing that the user sees when they navigate to the
        details page.
      </p>
      <p>
        We'll need to import the <code>ListingDetailsCardImages</code> component
        and render it inside of the <code>ListingDetailsCard</code> component,
        and pass it the <code>listing</code> as props. We'll also add a{' '}
        <code>Separator</code> with some margin to make it look nice.
      </p>
      <p>
        We'll need to update the <code>ListingDetailsCard</code> component with
        the following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9, 10]}
        title='src/components/ListingDetailsCard.jsx'
      >
        {listingDetailsCardWithListingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};

const notFoundPageCode = `import { Link } from 'react-router-dom';

import { Button, Card } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <div className='container flex h-screen w-screen items-center justify-center py-4 text-center'>
      <Card className='p-8'>
        <h1>Page not found</h1>
        <p className='pb-2'>
          Unfortunately, the page that you're looking for does not exist.
        </p>
        <Button asChild>
          <Link to='/' replace>
            Back to Home
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Creating the <code>NotFoundPage</code> component
      </h2>
      <p>
        Great! Our listing details page is complete! Let's now go back to our
        router, because we have one more thing to take care of in our app.
        You'll notice that if we manually change the URL in the browser to
        anything else other than what we've configured, we get an ugly error.
        That's not a nice user experience and we need to fix that.
      </p>
      <p>
        The way that we fix that with <code>react-router-dom</code> is that we
        need to provide a fallback component in case the current URL is not
        mapped to any valid route, which right now is only <code>/</code> and{' '}
        <code>/listings/:listingId</code>. We can create a generic{' '}
        <code>NotFoundPage</code> page component to render some UI for users to
        see in case they land there.
      </p>
      <p>
        In that page, we should also add a button to return to the home page to
        make it easier for our users to find their way back. We'll again use the{' '}
        <code>Link</code> component to send our users to the home page. We'll
        also pass <code>replace</code> as props to <code>Link</code> so that the
        entire history gets replaced and users can't go back to the error page.
      </p>
      <p>
        We'll need to create a new file inside <code>src/pages</code> called{' '}
        <code>NotFoundPage.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/pages/NotFoundPage.jsx'>
        {notFoundPageCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithNotFoundPageCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
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
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Adding <code>NotFoundPage</code> to <code>router</code>
      </h2>
      <p>
        Now that we have our <code>NotFoundPage</code> component, we need to
        plug it into our <code>router</code> to have it act as a fallback for
        any route that is not handled. To do this, we'll need to use the{' '}
        <code>errorElement</code> property.
      </p>
      <p>
        With <code>react-router-dom</code> we can easily pass any component to
        have it act as a error fallback. This means that when our users navigate
        to a page that is not configured, instead of showing that ugly error,{' '}
        <code>react-router-dom</code> will render that component instead.
      </p>
      <p>
        All that we need to do is to pass <code>NotFoundPage</code> as the{' '}
        <code>errorElement</code> in our router, under the main <code>/</code>{' '}
        index route. This will handle all of our errors in any route. After
        this, we'll be able to type any invalid URL and we'll always see this
        component, which is a much better user experience.
      </p>
      <p>
        We'll need to update the <code>Router</code> component with the
        following code:
      </p>
      <CodeHighlighter highlightedLines={[5, 13]} title='src/Router.jsx'>
        {routerWithNotFoundPageCode}
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
        Congratulations! You've successfully completed the 4th module of the
        course. You should now be able to navigate between the home page and the
        listing details page by clicking on any listing! If your code is not
        working as expected, you can always refer to the solution on GitHub
        using the link above. You can also post on the Discord and some one will
        help you figure it out!
      </p>
      <p>
        In this module we've learnt how to work with{' '}
        <code>react-router-dom</code>, how to create a router using{' '}
        <code>createBrowserRouter</code> and pass it to our app through{' '}
        <code>RouterProvider</code>, we've learnt how to navigate between routes
        and pass params to them, and also learnt how to create our own "page not
        found" component to show.
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>5-hooks-and-performance</code> from the dropdown above. See you
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
