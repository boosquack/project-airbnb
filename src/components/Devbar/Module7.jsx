import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Create the <code>AuthProvider</code> component',
  'Add <code>AuthProvider</code> to the app',
  'Fetch the access <code>token</code> in <code>AuthProvider</code>',
  'Hide the <code>Navbar</code> when not signed in',
  'Create the <code>SignInPage</code> component',
  'Add the <code>SignInPage</code> to <code>Router</code>',
  'Create the <code>SignInForm</code> component',
  'Add <code>SignInForm</code> to <code>SignInPage</code>',
  'Handle the <code>SignInForm</code> submission',
  'Turn on authentication in <code>env</code> and sign in',
  "Add the user's <code>token</code> to all requests",
  'Refresh the <code>token</code> when expired',
  'Create the <code>Route</code> component',
  'Update all routes with <code>Route</code>',
  'Redirect to <code>/</code> when signed in',
  'Create the sign out button in <code>Navbar</code>',
];

export const Intro = () => {
  return (
    <div>
      <h2>Module 7 - Forms and Authentication</h2>
      <Separator className='mb-2' />
      <p>
        In this module we will be implementing forms and authentication. We'll
        be moving our app behind a sign in screen and only allowing signed in
        users to use it. We'll be implementing our own authentication layer
        using JWTs, storing the tokens securely in memory, and setting up React
        Hook Form to easily implement forms in our application!
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        Currently, our application is accessible to anyone without an account.
        In a real-world application, most of the application would be behind a
        sign in screen and only users with an account will be able to use it. To
        do that, we'll need to create a "Sign In" page to allow users to sign
        in, as well as a "Sign Out" button for users to sign out. The "Sign In"
        page will have a form that will have an email input as well as a
        password input to sign in. The form should handle validation and allow
        us to customise what validation rules we want to apply for each field.
        When the credentials submitted are valid, then we need to redirect the
        user to the home page.
      </p>
      <p>
        We'll also need to handle the user's access token by storing it in
        memory. We won't store it in <code>localStorage</code> as that is not
        secure and can lead to XSS attacks. Our mock API will handle generating
        and validating the token, as well as providing us an endpoint to refresh
        the user's token. We'll have to store it and inject it into every
        request the user makes.
      </p>
      <p>
        To do all of that we'll need to setup React Hook Form, create the{' '}
        <code>SignInPage</code> and the <code>SignInForm</code> components, and
        create a custom <code>AuthProvider</code> to store the user's token as
        well as intercept our API requests. In the <code>Navbar</code> we'll
        also add a button to sign out, which should sign the user out and
        redirect the user to the sign in page.
      </p>
      <p>
        We're also going to need to handle refreshing the user's access token.
        Since we're storing it only in memory, it will get lost everytime the
        user refreshes the page. We're going to implement a basic version of
        refresh and access tokens. This will be the biggest feature of this
        application so far so get ready!
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

const authProviderCode = `import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Creating the <code>AuthProvider</code> component
      </h2>
      <p>
        The first thing we'll need to do is to create a provider that will hold
        the user's access <code>token</code>. This provider will be responsible
        for fetching and storing the <code>token</code> in the context and make
        it available to use in the entire application. This is the token that we
        will use to authenticate and identify a user and allow them to access
        the app.
      </p>
      <p>
        We'll create a new context called <code>AuthContext</code> using the
        React Context API and we'll create a custom hook to use that context.
        Inside we'll have a state variable to hold the <code>token</code> and a
        function to update it.
      </p>
      <p>
        We'll default the <code>token</code> to <code>undefined</code> on
        initial mount. Later on we'll use this state to determine if the{' '}
        <code>token</code> has been fetched or not. This will be useful to show
        a pending UI state while the <code>token</code> is loading, and when
        fetched to determine if the user is signed in or not.
      </p>
      <p>
        It's important to note that this token is stored in state, which means
        we're storing it in memory. Everytime the user refreshes the page, the
        token will be reset to <code>undefined</code> and will need to be
        refreshed. We'll have to implement that in later steps.
      </p>
      <p>
        We'll need to create a new file in the <code>src/components</code>{' '}
        folder called <code>AuthProvider.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/AuthProvider.jsx'>
        {authProviderCode}
      </CodeHighlighter>
    </div>
  );
};

const mainWithAuthProviderCode = `import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import AuthProvider from '@/components/AuthProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Adding <code>AuthProvider</code> to the app
      </h2>
      <p>
        Now that we have our <code>AuthProvider</code>, the next step is to wrap
        our entire app with it, so that we can access its value in any component
        across our entire application.
      </p>
      <p>
        We'll add this at the top level of our application and wrap{' '}
        <code>Router</code> so that no matter where we try to access the{' '}
        <code>token</code> from we'll be able to access it. The{' '}
        <code>Router</code> contains every single component that we will have in
        our application.
      </p>
      <p>
        We'll need to update the <code>main.jsx</code> file with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[5, 19, 21]} title='src/main.jsx'>
        {mainWithAuthProviderCode}
      </CodeHighlighter>
    </div>
  );
};

const authProviderWithFetchMeCode = `import { createContext, useContext, useEffect, useState } from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Fetching the access <code>token</code> in <code>AuthProvider</code>
      </h2>
      <p>
        Now that our <code>AuthProvider</code> is setup and connected to our
        app, the next step is to fetch the <code>token</code> from the API and
        store it in the provider so it no longer is <code>undefined</code>.
        We'll be using the <code>/api/me</code> endpoint for this which will
        return the <code>token</code> if the user is signed in. This will allow
        us to determine the user's signed in state as soon as our application
        mounts.
      </p>
      <p>
        We'll create a <code>useEffect</code> with a <code>fetchMe</code>{' '}
        function to fetch the <code>token</code>. If the request succeeds, we'll
        update the <code>token</code> state with the received{' '}
        <code>response.data.accessToken</code>. If the request fails, we'll set
        the <code>token</code> state to <code>null</code>. We're specifically
        setting it to <code>null</code> instead of <code>undefined</code> so
        that we can differentiate between the two states. <code>null</code> will
        mean that we fetched it and it wasn't available, and{' '}
        <code>undefined</code> will mean that it hasn't yet been fetched.
      </p>
      <p>
        We'll need to update <code>AuthProvider.jsx</code>, with the following
        code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          1, 3, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithFetchMeCode}
      </CodeHighlighter>
    </div>
  );
};

const appWithAuthCode = `import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Devbar from '@/components/Devbar/Devbar';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        {token && <Navbar />}
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
        Hiding the <code>Navbar</code> when not signed in
      </h2>
      <p>
        With the <code>token</code> now fetched and accessible in our
        application, we can start using it. The first thing that we'll want to
        do is to hide the <code>Navbar</code> component if the user is not
        signed in. This is to prepare for when we will show a sign in screen
        instead, which should not have a navigation bar.
      </p>
      <p>
        To check for the <code>token</code> we can import the{' '}
        <code>useAuth</code> custom hook from the <code>AuthProvider</code> and
        use it. This will give us access to the value of <code>token</code> as
        its being updated by <code>AuthProvider</code>.
      </p>
      <p>
        Since we've previously defined that a <code>token</code> value of{' '}
        <code>undefined</code> means we haven't fetched it yet, and that a value
        of <code>null</code> means that the <code>token</code> has been fetched
        but the user is not signed in, we can use that to determine if we should
        show the <code>Navbar</code> or not. In this case, we don't want to show
        the <code>Navbar</code> either way.
      </p>
      <p>
        We'll need to update the <code>App</code> component with the following
        code:
      </p>
      <CodeHighlighter highlightedLines={[3, 8, 16]} title='src/App.jsx'>
        {appWithAuthCode}
      </CodeHighlighter>
    </div>
  );
};

const signInPageCode = `const SignInPage = () => {
  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      Sign in form goes here!
    </div>
  );
};

export default SignInPage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Creating the <code>SignInPage</code> component
      </h2>
      <p>
        Let's now create the "Sign In" page. We'll create a{' '}
        <code>SignInPage</code> component in the <code>pages</code> folder. This
        will be a simple page component that will render our usual page styles.
        For now, we'll render a simple "Sign in form goes here!" message as we
        haven't yet built the sign in form.
      </p>
      <p>
        For this page, we're also going to add some styles to center the content
        in the middle of the page. That's preparation work for when we actually
        build the sign in form component, which will be quite small in size and
        should be centered.
      </p>
      <p>
        We'll create a new file in the <code>src/pages</code> folder called{' '}
        <code>SignInPage.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/pages/SignInPage.jsx'>
        {signInPageCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithSignInPageCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
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

export const Step6 = () => {
  return (
    <div>
      <h2>
        Adding the <code>SignInPage</code> to <code>Router</code>
      </h2>
      <p>
        Now that we have the <code>SignInPage</code> built, as usual, we need to
        add it to our router for us to be able to navigate to it. We're going to
        add it under the <code>/signin</code> path. This will make it available
        at the same level as all of our other routes.
      </p>
      <p>
        Currently, this page will be accessible regardless of whether or not the
        user is signed in or out. In later steps we're going to create a
        component to protect each route and only allow certain routes to be
        accessible if the user is signed in.
      </p>
      <p>
        We'll need to update the <code>Router</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[7, 17, 18, 19, 20]}
        title='src/Router.jsx'
      >
        {routerWithSignInPageCode}
      </CodeHighlighter>
    </div>
  );
};

const signInFormCode = `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button>Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Creating the <code>SignInForm</code> component
      </h2>
      <p>
        We now need to create the <code>SignInForm</code> component. This
        component will be responsible for rendering the sign in form, handling
        validation, and submitting the form data to the API so that the user can
        sign in to our app.
      </p>
      <p>
        The <code>SignInForm</code> will be a feature component, which will
        handle everything related to the feature of signing a user in. We'll be
        able to use this component in any page or section of a page where we
        want to have sign in functionality.
      </p>
      <p>
        We'll be using React Hook Form to handle the form validation and
        submission and we'll be using the <code>zod</code> library to define our
        form schema and use that to validate the form. We'll be able to inject
        the <code>zod</code> schema into React Hook Form through the{' '}
        <code>zodResolver</code> function.
      </p>
      <p>
        We'll keep things simple by only including the <code>email</code> and{' '}
        <code>password</code> field. We'll use the <code>z.email()</code>{' '}
        function to make sure only valid emails will be accepted. For the
        password, we'll just restrict it to being minimum 8 characters.
      </p>
      <p>
        We'll create a new file in the <code>src/components</code> folder called{' '}
        <code>SignInForm.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/SignInForm.jsx'>
        {signInFormCode}
      </CodeHighlighter>
    </div>
  );
};

const signInPageWithSignInFormCode = `import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Add <code>SignInForm</code> to <code>SignInPage</code>
      </h2>
      <p>
        Now that we have the <code>SignInForm</code> built, we need to add it to
        the <code>SignInPage</code> component. We'll do this by importing the{' '}
        <code>SignInForm</code> and rendering it inside the page.
      </p>
      <p>
        Because we've done the work previously to add container styles to this
        page, the form renders nicely in the middle of the page as you would
        expect from any other application!
      </p>
      <p>
        We'll need to update the <code>SignInPage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 6]}
        title='src/pages/SignInPage.jsx'
      >
        {signInPageWithSignInFormCode}
      </CodeHighlighter>
    </div>
  );
};

const signInFormWithOnSubmitCode = `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signin', data);
      setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        message: e.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>

          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Handling the <code>SignInForm</code> submission
      </h2>
      <p>
        With our <code>SignInForm</code> now created, we need to handle the form
        submission when a user tries to sign in. What we need to do is that when
        the form is submitted, we need to send a request to the backend with the{' '}
        <code>email</code> and <code>password</code> data and let the backend
        verify the user's credentials.
      </p>
      <p>
        We'll use the <code>/api/signin</code> endpoint for this which will
        return an access token if the user's credentials are valid, otherwise it
        will throw an error. Then, once we have the access token, we'll need to
        use the <code>setToken</code> function from the{' '}
        <code>AuthProvider</code> through <code>useAuth</code> to store the
        token in the provider and make it available across our app.
      </p>
      <p>
        Since we're using React Hook Form, we don't have to track our own
        loading and error states. We get access to a <code>isSubmitting</code>{' '}
        property, as well as the <code>errors</code> property we created
        earlier. We can use those to determine what state the form is in.
      </p>
      <p>
        However, we need to handle the case where the API throws an error, such
        as when the user's credentials are invalid. For this, we can use the{' '}
        <code>setError</code> function from React Hook Form to set a "root"
        error. We'll set it under <code>root</code>. This will then be
        accessible by calling <code>errors.root</code>, which we can use to show
        in the UI.
      </p>
      <p>
        We'll need to update the <code>SignInForm</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          5, 6, 22, 25, 26, 28, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 73, 74,
          77, 78, 79, 80, 81,
        ]}
        title='src/components/SignInForm.jsx'
      >
        {signInFormWithOnSubmitCode}
      </CodeHighlighter>
    </div>
  );
};

const envWithAuthCode = `VITE_BASE_URL=http://localhost:5173
VITE_COSDEN_SOLUTIONS_URL=https://cosden.solutions
VITE_DISCORD_URL=https://discord.gg/X6yGbdQbKR
VITE_USE_AUTH=true`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Turning on authentication in <code>env</code> and signing in
      </h2>
      <p>
        Currently, the authentication features are turned off in our app. Even
        with valid credentials, signing in won't actually sign the user in. This
        was done so that we could build the app up to this point without having
        to worry about authentication.
      </p>
      <p>
        However, for us to be able to continue, we need to enable it. To do
        that, simply modify the <code>VITE_USE_AUTH</code> env variable and set
        it to <code>true</code>. This will turn on authentication and block all
        requests to the app unless signed in. Our app will then mostly no longer
        work, but we'll be fixing that in the next steps!
      </p>
      <p>
        With the authentication turned on, we can now sign in to the application
        by using the available demo account. The email is{' '}
        <code>demo@cosdensolutions.io</code> and the password is{' '}
        <code>cosdensolutions</code>. We can sign in, see the{' '}
        <code>Navbar</code> appear, and even try to go to the "Home" page! But
        since our <code>token</code> is not sent in any request yet, we won't
        see any data.
      </p>
      <p>
        We'll need to update the <code>.env</code> file with the following code:
      </p>
      <CodeHighlighter highlightedLines={[4]} title='src/.env'>
        {envWithAuthCode}
      </CodeHighlighter>
    </div>
  );
};

const authProviderWithRequestInterceptorCode = `import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? ${'`Bearer ${token}`'}
        : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Adding the user's <code>token</code> to all requests
      </h2>
      <p>
        The next step before we can fully complete our authentication is that we
        need to add the user's
        <code>token</code> to all requests. Right now, even if the user signs in
        with correct credentials and the <code>token</code> is stored in the{' '}
        <code>AuthProvider</code> component, we're not sending this token to any
        request so the backend will consider the user signed out.
      </p>
      <p>
        To fix this, we'll need to send it through every request by making use
        of interceptors from <code>axios</code>. Interceptors allow us to
        intercept requests before they are sent, and responses before they are
        returned. We'll use this to add the token to all of our requests as they
        are being sent.
      </p>
      <p>
        The most logical place to add this piece of code is inside the{' '}
        <code>AuthProvider</code>, since that's where the <code>token</code>{' '}
        lives. We want to register an interceptor on mount and everytime the{' '}
        <code>token</code> changes. This will ensure that the latest token is
        always kept in sync with our requests.
      </p>
      <p>
        For this we're going to use <code>useLayoutEffect</code> since this will
        prevent further rendering until the code inside is executed. This will
        prevent a race condition where the token will be updated after the child
        component mounts and fires a request.
      </p>
      <p>
        We'll need to update the <code>AuthProvider</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithRequestInterceptorCode}
      </CodeHighlighter>
    </div>
  );
};

const authProviderWithResponseInterceptorCode = `import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? ${'`Bearer ${token}`'}
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = ${'`Bearer ${response.data.accessToken}`'};
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Refreshing the <code>token</code> when expired
      </h2>
      <p>
        In the previous step, we've added the <code>token</code> to all
        requests. For security purposes, that token is only valid for 15
        minutes. After that, we'll need to refresh it on the user's behalf. This
        is mostly handled on the backend, but we need to do a few things on the
        frontend as well to make it complete.
      </p>
      <p>
        If a user's credentials are valid but the access token has expired, the
        backend will return a response with the <code>403</code> status code, as
        well as a <code>Unauthorized</code> message. If that happens, we need to
        try to refresh the token by making a request to{' '}
        <code>/api/refreshToken</code>. If the user's <code>refreshToken</code>{' '}
        is still valid, we'll get a new access <code>token</code> that we can
        use instead of the expired one. We will be able to do this as long as
        the <code>refreshToken</code> from the backend is valid.
      </p>
      <p>
        We'll plug that new access <code>token</code> in the original request
        through another interceptor, as well as store it in the{' '}
        <code>AuthProvider</code>, and we'll send the request onwards. If the{' '}
        <code>refreshToken</code> is no longer valid, then we'll consider the
        user signed out and redirect them to the <code>SignInPage</code>.
      </p>
      <p>
        We'll need to create another <code>axios</code> interceptor for this,
        but this time for the response. The interceptor will check for the
        response <code>status</code>, as well as <code>message</code> to
        determine if it should try to refresh the token. If so, it will call the{' '}
        <code>/api/refreshToken</code> endpoint to get a new access{' '}
        <code>token</code>.
      </p>
      <p>
        If a new <code>token</code> is returned, then we'll set it in the state,
        as well as in the headers of the <code>originalRequest</code>. We'll
        also need to set a custom <code>_retry</code> variable that we can use
        in the request interceptor to prevent this new <code>token</code> from
        being overridden by the request interceptor. Finally, we'll call the{' '}
        <code>originalRequest</code> and return its response.
      </p>
      <p>
        If the refresh api call fails, we'll simply set the <code>token</code>{' '}
        to <code>null</code> and the user will automatically be redirected to
        the <code>SignInPage</code> by our other code.
      </p>
      <p>
        We'll need to update the <code>AuthProvider</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          42, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        ]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithResponseInterceptorCode}
      </CodeHighlighter>
    </div>
  );
};

const routeCode = `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Spinner } from '@/components/ui';

const Route = ({ children, isProtected }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
    }
  }, [isProtected, navigate, token]);

  return token === undefined ? (
    <div className='absolute bottom-0 left-0 right-0 top-0 ml-[700px] flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Route;`;

export const Step13 = () => {
  return (
    <div>
      <h2>
        Creating the <code>Route</code> component
      </h2>
      <p>
        Since we've enabled authentication in our app we need to implement a way
        to protect our routes and only allow signed in users to access them,
        since the requests will only work for signed in users and signed out
        users shouldn't be able to access those pages.
      </p>
      <p>
        To do that, we'll create a custom <code>Route</code> component that
        redirects the user to the <code>SignInPage</code> if they are not signed
        in. We'll wrap each of our routes in our <code>Router</code> with this
        so that no matter what page the user is on, if they are not signed in,
        they will be redirected to the <code>SignInPage</code> and will not be
        able to access any other page.
      </p>
      <p>
        The component will accept a <code>isProtected</code> prop to allow us to
        customise whether or not a route should be protected. If protected,
        we'll use the <code>navigate</code> function to redirect the user and
        we'll pass <code>replace</code> as <code>true</code> so that we clear
        the history and prevent the user from navigating back.
      </p>
      <p>
        It's important to note that we're only going to be redirecting the user
        if we have tried to fetch the <code>token</code> and it wasn't valid. So
        we'll need to check for <code>null</code> specifically and only redirect
        based on that.
      </p>
      <p>
        We'll need to create a new file in the <code>src/components</code>{' '}
        folder called <code>Route.jsx</code> with the following code:
      </p>
      <CodeHighlighter title='src/components/Route.jsx'>
        {routeCode}
      </CodeHighlighter>
    </div>
  );
};

const routerWithRouteCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Route from '@/components/Route';
import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/signin',
        element: (
          <Route>
            <SignInPage />
          </Route>
        ),
      },
      {
        path: '/',
        element: (
          <Route isProtected>
            <HomePage />
          </Route>
        ),
      },
      {
        path: '/listings/:listingId',
        element: (
          <Route isProtected>
            <ListingDetailsPage />
          </Route>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Route isProtected>
            <ListingFavoritesPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step14 = () => {
  return (
    <div>
      <h2>
        Updating all routes with <code>Route</code>
      </h2>
      <p>
        Now that we have our <code>Route</code> component, we need to update all
        of our routes to use it. We'll wrap each of our routes in our{' '}
        <code>Router</code> and pass the <code>isProtected</code> to the routes
        that we want to protect for only signed in users.
      </p>
      <p>
        Because we put all of this functionality in one re-usable component, if
        in the future we want to add any extra functionality to our routes,
        we'll be able to easily do it through this <code>Route</code> component
        and have it apply to all routes. That's the power of React!
      </p>
      <p>
        We'll need to update the <code>Router</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47]}
        title='src/Router.jsx'
      >
        {routerWithRouteCode}
      </CodeHighlighter>
    </div>
  );
};

const signInPageWithRedirectCode = `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);

  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;`;

export const Step15 = () => {
  return (
    <div>
      <h2>
        Redirecting to <code>/</code> when signed in
      </h2>
      <p>
        The next step is for us to redirect the user to the home page once they
        are signed in. This is the reverse of what we did in the{' '}
        <code>Route</code> component. And here, we'll do something smart.
        Instead of redirecting the user from the <code>onSubmit</code> function
        in the <code>SignInForm</code>, right after they submit the form, we'll
        instead put that code in the <code>SignInPage</code> component.
      </p>
      <p>
        The reason we want to do it this way is because the{' '}
        <code>SignInPage</code> should not be accessible when the user is signed
        in. If we redirect from the <code>onSubmit</code> function, then there's
        nothing preventing the user from manually updating their browser url to{' '}
        <code>/signin</code> and accessing the page.
      </p>
      <p>
        If we instead handle the redirect directly from the{' '}
        <code>SignInPage</code>, then we prevent the user from ever accessing
        the page while signed in, as well as being automatically redirected when
        they sign in through the <code>SignInForm</code>.
      </p>
      <p>
        To redirect the user, we'll use the <code>useNavigate</code> hook from{' '}
        <code>react-router-dom</code>. We'll use this hook to get the{' '}
        <code>navigate</code> function and then we'll use an{' '}
        <code>useEffect</code> hook to listen to changes in the{' '}
        <code>token</code> state. If the <code>token</code> is truthy, we'll
        redirect the user to the home page. We'll also use the{' '}
        <code>replace</code> parameter to remove the <code>/signin</code> route
        from the history so the user cannot press back to go back to it.
      </p>
      <p>
        This is quite similar to what we did with the <code>Route</code>{' '}
        component, but in reverse. We could've added this functionality inside
        of <code>Route</code>, but we currently only have one page like this so
        it's fine to put it here.
      </p>
      <p>
        We'll need to update the <code>SignInPage</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 4, 8, 9, 11, 12, 13, 14, 15]}
        title='src/pages/SignInPage.jsx'
      >
        {signInPageWithRedirectCode}
      </CodeHighlighter>
    </div>
  );
};

const navBarWithSignOutCode = `import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';

const Navbar = () => {
  const { setToken } = useAuth();

  const handleSignOut = async () => {
    try {
      await api.post('/api/signout');

      setToken(null);
    } catch {
      setToken(null);
    }
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <div className='flex-end flex flex-row items-center gap-8'>
          <Link to='/favorites'>Favorites</Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link>Account</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;`;

export const Step16 = () => {
  return (
    <div>
      <h2>
        Creating the sign out button in <code>Navbar</code>
      </h2>
      <p>
        The final step in our authentication is to allow the user to sign out.
        We'll do this by adding a button in the <code>Navbar</code> component
        that will call the <code>/api/signout</code> endpoint and sign the user
        out.
      </p>
      <p>
        The only thing we'll have to do here is to set the <code>token</code> to{' '}
        <code>null</code> upon a successful sign out response so that the app
        can know the user is signed out. By setting the <code>token</code> to{' '}
        <code>null</code>, the app will handle the rest since we've configured
        the required components to do so.
      </p>
      <p>
        We're going to add a new item in <code>Navbar</code> for our sign out
        button. We're going to create a dropdown menu called "Account" that will
        have the sign out button. This will allow us to add more things to this
        menu in the future if we want to. We'll also update some styles to the{' '}
        <code>Navbar</code> to make it look nicer.
      </p>
      <p>
        We'll need to update the <code>Navbar</code> component with the
        following code:
      </p>
      <CodeHighlighter
        highlightedLines={[
          3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24,
          28, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
        ]}
        title='src/components/Navbar.jsx'
      >
        {navBarWithSignOutCode}
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
        Congratulations! You've successfully completed the 7th module of the
        course. You should have authentication fully working in your app! Users
        should now be able to sign in, have proper validation in the sign in
        form, and only access the parts of the app that are protected if they
        are signed in. If your code is not working as expected, you can always
        refer to the solution on GitHub using the link above. You can also post
        on the Discord and some one will help you figure it out!
      </p>
      <p>
        In this module you've learnt how to create forms with React Hook Form,
        how to handle form validation with Zod, how to setup authentication and
        providers, and even how to handle access and refresh tokens!
      </p>
      <p>
        To move on to the next module, simply select <code>8-deploying</code>{' '}
        from the dropdown above. See you there!
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
