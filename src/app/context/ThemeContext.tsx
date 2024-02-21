import { createContext, useState, ReactNode, FC } from 'react';

export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type Params = {
  children: ReactNode;
  init: string;
};

const ThemeContextProvider: FC<Params> = ({ children, init }) => {
  const [theme, setTheme] = useState<string>(init);
  document.documentElement.setAttribute('color-scheme', theme);
  localStorage.setItem('theme', theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
