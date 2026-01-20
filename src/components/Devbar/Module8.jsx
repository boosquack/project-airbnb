import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';

export const Intro = () => {
  return (
    <div>
      <h2>Module 8 - Deploying</h2>
      <Separator className='mb-2' />
      <p>
        Welcome to the 8th module of the course! In this module, we'll learn how
        to deploy our application to the web. We'll use Vercel to deploy our
        application, which is a popular platform that makes it easy to deploy
        our React applications.
      </p>
      <h3>Tasks</h3>
      <Separator className='mb-2' />
      <ul>
        <li>Install the Vercel CLI</li>
        <li>
          Run the <code>vercel</code> command
        </li>
      </ul>
    </div>
  );
};

const vercelCliTerminalCode = `npm install -g vercel`;

export const Step1 = () => {
  return (
    <div>
      <h2>Installing the Vercel CLI</h2>
      <p>
        The first thing that we need to do is to install globally the Vercel
        CLI. This will be the easiest way to deploy our application to Vercel.
        The CLI will allow us to deploy our application with a single command.
      </p>
      <p>In your terminal, run the following command:</p>
      <CodeHighlighter title='terminal'>
        {vercelCliTerminalCode}
      </CodeHighlighter>
    </div>
  );
};

const vercelTerminalCode = `vercel`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Running the <code>vercel</code> command
      </h2>
      <p>
        Now that we have the Vercel CLI installed, we can run the{' '}
        <code>vercel</code> command in the root of our project to deploy our
        application. This command will walk us through the process of deploying
        our application to Vercel and will allow us to configure our project
        settings.
      </p>
      <p>
        We'll be asked a series of questions about our project and how we want
        to deploy it. We'll need to answer the following questions:
      </p>
      <ul className='mb-4'>
        <li>
          Set up and deploy "PROJECT_PATH"? - <b>Y</b>
        </li>
        <li>
          Which scope do you want to deploy to? - <b>YOUR NAME's Projects</b>
        </li>
        <li>
          Link to existing project? - <b>N</b>
        </li>
        <li>
          What’s your project’s name? - <b>project-react</b>
        </li>
        <li>
          In which directory is your code located? - <b>./</b>
        </li>
        <li>
          Want to modify these settings? - <b>N</b>
        </li>
      </ul>
      <p>
        Once you've answered all of the questions, Vercel will then deploy your
        app and will return to you a URL that you can visit to see the app live!
        You'll also be able to see it in your Vercel dashboard.
      </p>
      <p>In your terminal, run the following command:</p>
      <CodeHighlighter title='terminal'>{vercelTerminalCode}</CodeHighlighter>
    </div>
  );
};

export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Module Completed!</h2>
      <p>
        Congratulations! You've completed the 8th module of the course. You've
        learnt how to deploy an application using Vercel and the Vercel CLI, as
        well as how to set up automatic deployments using GitHub!
      </p>
      <p>
        This marks the end of the written course. If you have any questions
        about where to go next, feel free to ask in the Discord server. Good
        luck!
      </p>
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
