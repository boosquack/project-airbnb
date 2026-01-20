import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';

export const Intro = () => {
  return (
    <div>
      <h2>Welcome to Project React!</h2>
      <Separator className='mb-2' />
      <p>
        In this course, we'll be building a real-world project together using
        React. This is a different approach to learning React, as it focuses
        more on doing rather than just lectures, but it's one of the best ways
        to learn and see what React looks like in the real world.
      </p>
      <p>
        The way this course works is that you will be building a real-world
        application while learning how React works. The application will give
        you a clear and real example of what a production React application
        looks like. If you're worried about this being too difficult, don't
        worry! This course is made for beginners and will guide you through
        every step.
      </p>
      <h3>Description</h3>
      <Separator className='mb-2' />
      <p>
        You'll follow a module-based approach, where in each module you will
        learn new React concepts, and then immediately go and apply them to
        build more features for the application. You'll learn about React
        fundamentals and best practices, working with hooks, creating and
        defining routes, fetching data from an api, performance, setting up
        global state management, handling and validating forms, authenticating
        users, and so much more. The modules are designed to be followed in
        order, so don't skip any!
      </p>
      <p>
        This project is designed to let you focus on what matters: learning
        React. As such, you'll find a lot of boilerplate code already setup.
        Things such as dependencies, components, folder structures, etc. are
        already setup for you so that you can focus on learning React and
        building the application. The code is yours, so when you're ready, you
        can explore everything that it has to offer!
      </p>
      <p>Click "Next" above to continue to the next step.</p>
    </div>
  );
};

export const Step1 = () => {
  return (
    <div>
      <h2>Navigating between steps</h2>
      <p>
        Great! You've just learned how to navigate between different steps. To
        go backwards, you can click the "Previous" button. You can navigate
        between all the different steps and modules as much as you want without
        restrictions.
      </p>
      <p>
        Your progress is automatically saved in your <code>localStorage</code>,
        so you will always be back right where you left off, as long as you're
        on the same browser. This is all handled by the <code>Devbar</code>{' '}
        component, which we'll see in the next step.
      </p>
      <p>Click "Next" above to continue to the next step.</p>
    </div>
  );
};

export const Step2 = () => {
  return (
    <div>
      <h2>
        The <code>Devbar</code> and how it works
      </h2>
      <p>
        The <code>Devbar</code> is a custom built component that is always
        visible on the left side of the screen. It is used to guide you through
        the course and track your progress.
      </p>
      <p>
        At the top, to the right of the "Previous" and "Next" buttons, you have
        a menu button with some handy links. The <b>Course</b> link will take
        you to homepage of the course, the <b>Discord</b> link will take you to
        the Cosden Solutions Discord where you can ask questions and get help,
        and the <b>Theme</b> sub-menu will let you change the theme of the
        application.
      </p>
      <p>
        There are a lot of cool features in the <code>Devbar</code> component
        such as <code>localStorage</code> saving, light/dark mode toggles,
        dropdown menus, progress tracking, and much more. If you're curious, you
        can check out the code to see how they all work!
      </p>
      <p>Click "Next" above to continue to the next step.</p>
    </div>
  );
};

const demoCode = `import React from 'react';

const Demo = () => {
  return (
    <div>
      <h1>I am changed!</h1>
    </div>
  );
}`;

export const Step3 = () => {
  return (
    <div>
      <h2>Working with code snippets</h2>
      <p>
        In most steps, you'll see a code block. This code represents the code
        that must be implemented in that step. It will always be the full code,
        and won't be shortened in any way. The goal is so that you get to see
        exactly, line by line, what changes are being made at every step.
      </p>
      <p>
        The code snippets will highlight the changed lines where applicable.
        Often times you'll need to make modifications to components or files
        that you've created in previous steps. If there are no highlighted
        lines, then you can assume this is a new file to create.
      </p>
      <p>
        Here's an example of a code block. You have the file path at the top,
        then the code right below, and the highlighted line where there is a
        change:
      </p>
      <CodeHighlighter highlightedLines={[6]} title='src/Demo.jsx'>
        {demoCode}
      </CodeHighlighter>
      <p>Click "Next" above to continue to the next step.</p>
    </div>
  );
};

export const Step4 = () => {
  return (
    <div>
      <h2>Changing between modules</h2>
      <p>
        Just like you can navigate back and forth between steps in a module, you
        can also change modules at any time. This isn't recommended as each
        module is designed to be followed in order, but you can do it if you are
        curious about what lies ahead.
      </p>
      <p>
        You can use the dropdown menu right below the progress bar to change to
        any module that you want. Don't worry, your progress will be saved so
        you can always come back to the module you were on previously.
      </p>
      <p>
        Once you are ready, click "Next" above to complete the introduction
        module.
      </p>
    </div>
  );
};

export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Module Completed!</h2>
      <p>
        Congratulations! You've completed the introductionary module of the
        course. You can now move on to the first module and actually begin
        learning React and start building the application! Best of luck to you,
        and see you on the other side!
      </p>
      <p>
        To move on to the next module, simply select{' '}
        <code>1-react-fundamentals</code> from the dropdown above.
      </p>
      <p>That's the end of the tutorial. Good luck!</p>
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
