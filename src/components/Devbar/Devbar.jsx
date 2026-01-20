import { useEffect, useMemo, useState } from 'react';

import { useTheme } from '@/components/ThemeProvider';
import {
  Button,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/components/ui';
import { env } from '@/lib/env';
import { getImageUrl } from '@/lib/utils/images';
import { getItem, setItem } from '@/lib/utils/localStorage';

import DevbarMenu from './DevbarMenu';
import {
  Completed as M0Completed,
  Intro as M0Intro,
  Step1 as M0Step1,
  Step2 as M0Step2,
  Step3 as M0Step3,
  Step4 as M0Step4,
} from './Module0';
import {
  Completed as M1Completed,
  Intro as M1Intro,
  Step1 as M1Step1,
  Step2 as M1Step2,
  Step3 as M1Step3,
  Step4 as M1Step4,
  Step5 as M1Step5,
  Step6 as M1Step6,
} from './Module1';
import {
  Completed as M2Completed,
  Intro as M2Intro,
  Step1 as M2Step1,
  Step2 as M2Step2,
  Step3 as M2Step3,
  Step4 as M2Step4,
  Step5 as M2Step5,
  Step6 as M2Step6,
} from './Module2';
import {
  Completed as M3Completed,
  Intro as M3Intro,
  Step1 as M3Step1,
  Step2 as M3Step2,
  Step3 as M3Step3,
  Step4 as M3Step4,
  Step5 as M3Step5,
  Step6 as M3Step6,
  Step7 as M3Step7,
  Step8 as M3Step8,
  Step9 as M3Step9,
} from './Module3';
import {
  Completed as M4Completed,
  Intro as M4Intro,
  Step1 as M4Step1,
  Step2 as M4Step2,
  Step3 as M4Step3,
  Step4 as M4Step4,
  Step5 as M4Step5,
  Step6 as M4Step6,
  Step7 as M4Step7,
  Step8 as M4Step8,
  Step9 as M4Step9,
  Step10 as M4Step10,
  Step11 as M4Step11,
  Step12 as M4Step12,
} from './Module4';
import {
  Completed as M5Completed,
  Intro as M5Intro,
  Step1 as M5Step1,
  Step2 as M5Step2,
  Step3 as M5Step3,
  Step4 as M5Step4,
  Step5 as M5Step5,
  Step6 as M5Step6,
  Step7 as M5Step7,
  Step8 as M5Step8,
  Step9 as M5Step9,
  Step10 as M5Step10,
} from './Module5';
import {
  Completed as M6Completed,
  Intro as M6Intro,
  Step1 as M6Step1,
  Step2 as M6Step2,
  Step3 as M6Step3,
  Step4 as M6Step4,
  Step5 as M6Step5,
  Step6 as M6Step6,
  Step7 as M6Step7,
  Step8 as M6Step8,
  Step9 as M6Step9,
  Step10 as M6Step10,
  Step11 as M6Step11,
  Step12 as M6Step12,
  Step13 as M6Step13,
  Step14 as M6Step14,
  Step15 as M6Step15,
} from './Module6';
import {
  Completed as M7Completed,
  Intro as M7Intro,
  Step1 as M7Step1,
  Step2 as M7Step2,
  Step3 as M7Step3,
  Step4 as M7Step4,
  Step5 as M7Step5,
  Step6 as M7Step6,
  Step7 as M7Step7,
  Step8 as M7Step8,
  Step9 as M7Step9,
  Step10 as M7Step10,
  Step11 as M7Step11,
  Step12 as M7Step12,
  Step13 as M7Step13,
  Step14 as M7Step14,
  Step15 as M7Step15,
  Step16 as M7Step16,
} from './Module7';
import {
  Completed as M8Completed,
  Intro as M8Intro,
  Step1 as M8Step1,
  Step2 as M8Step2,
} from './Module8';

// Declares the initial module to start on
const INITIAL_MODULE = '0-introduction';

// Creates an object with all the modules and their steps
const modules = {
  '0-introduction': {
    steps: {
      0: <M0Intro />,
      1: <M0Step1 />,
      2: <M0Step2 />,
      3: <M0Step3 />,
      4: <M0Step4 />,
      5: <M0Completed />,
    },
  },
  '1-react-fundamentals': {
    steps: {
      0: <M1Intro />,
      1: <M1Step1 />,
      2: <M1Step2 />,
      3: <M1Step3 />,
      4: <M1Step4 />,
      5: <M1Step5 />,
      6: <M1Step6 />,
      7: <M1Completed />,
    },
  },
  '2-state-and-event-handlers': {
    steps: {
      0: <M2Intro />,
      1: <M2Step1 />,
      2: <M2Step2 />,
      3: <M2Step3 />,
      4: <M2Step4 />,
      5: <M2Step5 />,
      6: <M2Step6 />,
      7: <M2Completed />,
    },
  },
  '3-effects-and-data-fetching': {
    steps: {
      0: <M3Intro />,
      1: <M3Step1 />,
      2: <M3Step2 />,
      3: <M3Step3 />,
      4: <M3Step4 />,
      5: <M3Step5 />,
      6: <M3Step6 />,
      7: <M3Step7 />,
      8: <M3Step8 />,
      9: <M3Step9 />,
      10: <M3Completed />,
    },
  },
  '4-routes-and-navigation': {
    steps: {
      0: <M4Intro />,
      1: <M4Step1 />,
      2: <M4Step2 />,
      3: <M4Step3 />,
      4: <M4Step4 />,
      5: <M4Step5 />,
      6: <M4Step6 />,
      7: <M4Step7 />,
      8: <M4Step8 />,
      9: <M4Step9 />,
      10: <M4Step10 />,
      11: <M4Step11 />,
      12: <M4Step12 />,
      13: <M4Completed />,
    },
  },
  '5-hooks-and-performance': {
    steps: {
      0: <M5Intro />,
      1: <M5Step1 />,
      2: <M5Step2 />,
      3: <M5Step3 />,
      4: <M5Step4 />,
      5: <M5Step5 />,
      6: <M5Step6 />,
      7: <M5Step7 />,
      8: <M5Step8 />,
      9: <M5Step9 />,
      10: <M5Step10 />,
      11: <M5Completed />,
    },
  },
  '6-state-management': {
    steps: {
      0: <M6Intro />,
      1: <M6Step1 />,
      2: <M6Step2 />,
      3: <M6Step3 />,
      4: <M6Step4 />,
      5: <M6Step5 />,
      6: <M6Step6 />,
      7: <M6Step7 />,
      8: <M6Step8 />,
      9: <M6Step9 />,
      10: <M6Step10 />,
      11: <M6Step11 />,
      12: <M6Step12 />,
      13: <M6Step13 />,
      14: <M6Step14 />,
      15: <M6Step15 />,
      16: <M6Completed />,
    },
  },
  '7-forms-and-authentication': {
    steps: {
      0: <M7Intro />,
      1: <M7Step1 />,
      2: <M7Step2 />,
      3: <M7Step3 />,
      4: <M7Step4 />,
      5: <M7Step5 />,
      6: <M7Step6 />,
      7: <M7Step7 />,
      8: <M7Step8 />,
      9: <M7Step9 />,
      10: <M7Step10 />,
      11: <M7Step11 />,
      12: <M7Step12 />,
      13: <M7Step13 />,
      14: <M7Step14 />,
      15: <M7Step15 />,
      16: <M7Step16 />,
      17: <M7Completed />,
    },
  },
  '8-deploying': {
    steps: {
      0: <M8Intro />,
      1: <M8Step1 />,
      2: <M8Step2 />,
      3: <M8Completed />,
    },
  },
};

// Creates an object with the initial progress for each module
const initialModuleProgress = Object.keys(modules).reduce((acc, moduleKey) => {
  acc[moduleKey] = 0;
  return acc;
}, {});

const Devbar = () => {
  const { theme } = useTheme();

  // Creates state for the current module and defaults to localStorage if it exists
  const [currentModule, setCurrentModule] = useState(
    getItem('project-react-module') || INITIAL_MODULE,
  );

  // Creates state for the current module progress and defaults to localStorage if it exists
  const [moduleProgress, setModuleProgress] = useState(
    getItem('project-react-moduleProgress') || initialModuleProgress,
  );

  // On mount, sets the initial module and module progress in localStorage if it doesn't exist
  useEffect(() => {
    if (!getItem('project-react-module')) {
      setItem('project-react-module', INITIAL_MODULE);
    }

    if (!getItem('project-react-moduleProgress')) {
      setItem('project-react-moduleProgress', initialModuleProgress);
    }
  }, []);

  // Derived value for the current module step
  const moduleStep = moduleProgress[currentModule];

  // Derived value for the current module steps length
  const moduleStepsLength = useMemo(
    () => Object.keys(modules[currentModule].steps).length,
    [currentModule],
  );

  // Derived value for the current module progress percentage
  const progressPercentage = (moduleStep / (moduleStepsLength - 1)) * 100;

  // Handles the module change
  const handleModuleChange = (moduleKey) => {
    setCurrentModule(moduleKey);
    setItem('project-react-module', moduleKey);
  };

  // Handles the previous step click
  const handlePreviousStep = () => {
    if (moduleStep > 0) {
      const newModuleProgress = {
        ...moduleProgress,
        [currentModule]: moduleStep - 1,
      };

      setModuleProgress(newModuleProgress);
      setItem('project-react-moduleProgress', newModuleProgress);
    }
  };

  // Handles the next step click
  const handleCompleteStep = () => {
    if (moduleStep < moduleStepsLength) {
      const newModuleProgress = {
        ...moduleProgress,
        [currentModule]: moduleStep + 1,
      };

      setModuleProgress(newModuleProgress);
      setItem('project-react-moduleProgress', newModuleProgress);
    }
  };

  return (
    <div className='relative h-screen w-[700px] flex-col items-center overflow-auto bg-card'>
      <div className='flex flex-row items-center justify-between gap-4 p-4'>
        <div className='flex flex-row items-center gap-3'>
          <img
            src={getImageUrl(
              theme === 'dark' ? '100w-logo.png' : '100w-logo-black.png',
            )}
            alt='logo'
            className='h-[36px]'
          />
          <a
            className='text-lg leading-5'
            href={env.COSDEN_SOLUTIONS_URL + '/project-react'}
            target='_blank'
            rel='noreferrer'
          >
            <b>Project React</b>
            <br />
            <span className='text-sm text-muted-foreground'>
              Made by <b>Cosden</b> Solutions
            </span>
          </a>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Button
            disabled={moduleStep === 0}
            variant='secondary'
            onClick={handlePreviousStep}
          >
            Previous
          </Button>
          <Button
            disabled={moduleStep === moduleStepsLength - 1}
            onClick={handleCompleteStep}
          >
            Next
          </Button>
          <DevbarMenu />
        </div>
      </div>

      <Separator />

      <div className='p-4'>
        <Progress value={progressPercentage} />
      </div>

      <Separator />

      <div className='p-4 pb-0'>
        <Select defaultValue={currentModule} onValueChange={handleModuleChange}>
          <SelectTrigger className='mb-2 w-full'>
            <SelectValue placeholder='Select a module' />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(modules).map((moduleKey) => (
              <SelectItem key={moduleKey} value={moduleKey}>
                {moduleKey}
                <span className='ml-2 text-sm text-muted-foreground'>
                  {moduleProgress[moduleKey] + 1 ===
                  Object.keys(modules[moduleKey].steps).length
                    ? 'Completed'
                    : `(${moduleProgress[moduleKey] + 1} of ${
                        Object.keys(modules[moduleKey].steps).length
                      } tasks)`}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='p-4'>{modules[currentModule].steps[moduleStep]}</div>
    </div>
  );
};

export default Devbar;
