import { createContext, useContext, useEffect, useState } from "react";
import { ThemeContextProps } from "@/propsType";

export const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  setDarkMode: () => {},
  handleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const DarkThemeProvider = ({ ...props }) => {
  const { children } = props;
  const [darkMode, setDarkMode] = useState(false);

  const handleTheme = () => {
    if (darkMode === true) {
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
      document.body.dataset.mode = "light";
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
      document.body.dataset.mode = "dark";
    }
  };

  useEffect(() => {
    if (
      localStorage.darkMode == "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.body.dataset.mode = "dark";
    } else {
      setDarkMode(false);
      document.body.dataset.mode = "light";
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        handleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
