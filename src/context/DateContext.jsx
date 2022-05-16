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
  const [currentYear, setCurrentYear] = useState(
    new Date(currentMonth).getFullYear()
  );
  const [firstDayYear, setFirstDayYear] = useState(
    new Date(currentDate.getFullYear(), 0, 1)
  );
  const [lastDayYear, setLastDayYear] = useState(
    new Date(currentDate.getFullYear(), 11, 31)
  );
  const currentMonthNumber =
    new Date(currentMonth.toLocaleDateString("en-US")).getMonth() + 1;
  const lastMonth =
    new Date(new Date().toLocaleDateString("en-US")).getMonth() + 1;
  const [month, setMonth] = useState(new Date());

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
        currentMonthNumber,
        lastMonth,
        firstDayYear,
        setFirstDayYear,
        lastDayYear,
        setLastDayYear,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
