import React from "react";

export const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={{ isDarkTheme: false, toggleTheme: () => {} }}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => React.useContext(ThemeContext);
