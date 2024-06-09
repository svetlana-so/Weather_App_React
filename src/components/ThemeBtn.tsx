import React from "react";
import useTheme from "../context/darkMode";

export const ThemeBtn = () => {

  const {themeMode, lightTheme, darkTheme} = useTheme()
  const onChangeBtn = () => {
    themeMode ==='dark'? lightTheme() : darkTheme()
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
    <input
      className="sr-only peer"
      type="checkbox"
      onChange={onChangeBtn}
      checked={themeMode === 'dark'}
    />
    <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600">
      <div className="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </div>
    
  </label>
  );
};
