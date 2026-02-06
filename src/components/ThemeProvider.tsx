import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { getItem, setItem } from '../lib/utils/localStorage';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'project-react-theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => getItem<Theme>(storageKey) || defaultTheme
  );
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    const newTheme = theme === 'system' ? systemTheme : theme;

    root.classList.add(theme);

    if (!getItem(storageKey)) {
      setItem(storageKey, newTheme);
    }
  }, [storageKey, systemTheme, theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (newTheme: Theme) => {
      const resolvedTheme = newTheme === 'system' ? systemTheme : newTheme;
      setItem(storageKey, resolvedTheme);
      setTheme(resolvedTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;
