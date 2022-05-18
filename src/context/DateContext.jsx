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
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [currentYear, setCurrentYear] = useState(new Date());
  const [firstDayYear, setFirstDayYear] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [lastDayYear, setLastDayYear] = useState(
    new Date(new Date().getFullYear(), 11, 31)
  );
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());

  // const currentMonthNumber =
  //   new Date(currentMonth.toLocaleDateString("en-US")).getMonth() + 1;
  // const lastMonth =
  //   new Date(new Date().toLocaleDateString("en-US")).getMonth() + 1;

  return (
    <DateContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        dateMode,
        setDateMode,
        currentDate,
        setCurrentDate,
        month,
        setMonth,
        // currentMonthNumber,
        // lastMonth,
        firstDayYear,
        setFirstDayYear,
        lastDayYear,
        setLastDayYear,
        // lastMonth,
        year,
        setYear,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
