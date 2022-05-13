import React, { useState } from "react";
import { createContext } from "react";

const DateContext = createContext();

export const DateContextProvider = ({ children }) => {
  const [dateMode, setDateMode] = useState({
    day: true,
    month: false,
    year: false,
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <DateContext.Provider
      value={{ dateMode, setDateMode, currentDate, setCurrentDate }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
