import { createContext, useContext, useEffect, useState } from 'react';

import { getItem, setItem } from '../lib/utils/localStorage';

const initialState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  storageKey = 'project-react-theme',
  ...props
}) => {
  const [theme, setTheme] = useState(() => getItem(storageKey) || defaultTheme);
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

  const value = {
    theme,
    setTheme: (theme) => {
      const newTheme = theme === 'system' ? systemTheme : theme;
      setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;
