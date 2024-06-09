import "./index.css";
import { ThemeBtn } from "./components/ThemeBtn";
import { Weather } from "./components/Weather";
import { ThemeProvider } from "./context/darkMode";
import { useEffect, useState } from "react";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark', 'light')
    document.querySelector('html')?.classList.add(themeMode)
  }, [themeMode])
  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }} >
      
      <Weather ></Weather>
    </ThemeProvider>
  );
}

export default App;
