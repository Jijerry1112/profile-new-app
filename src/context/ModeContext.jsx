import { createContext, useState } from "react";

const ModeContext = createContext();

export default ModeContext;

export const ModeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
  <ModeContext.Provider value={{theme, toggleTheme}}>
    {children}
  </ModeContext.Provider>
  )
};