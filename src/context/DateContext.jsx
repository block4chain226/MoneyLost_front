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
  const [days, setDays] = useState(0);
  const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());

  const currentMonthNumber = currentMonth.getMonth();

  const incrementDate = (e) => {
    // e.preventDefault();
    const today = new Date(new Date().getTime()).setUTCHours(0, 0, 0, 0);
    const curMon = new Date(currentMonth.getTime()).setUTCHours(0, 0, 0, 0);

    if (dateMode.month && curMon < today && curMon !== today) {
      setMonth(30);
      setDays((prevState) => prevState + 1);
    }
    if (dateMode.year && currentYear.getFullYear() < new Date().getFullYear()) {
      setYear(365);
      setDays((prevState) => prevState + 1);
    }

    if (
      dateMode.day &&
      new Date(currentDate.getTime()).setUTCHours(0, 0, 0, 0) < today
    ) {
      setDays((prevState) => prevState + 1);
    }
  };

  const decrementDate = (e) => {
    // e.preventDefault();
    if (dateMode.month) {
      setMonth(-30);
    }
    if (dateMode.year) {
      setYear(-365);
    }

    setDays((prevState) => prevState - 1);
  };

  return (
    <DateContext.Provider
      value={{
        decrementDate,
        incrementDate,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        dateMode,
        setDateMode,
        currentDate,
        setCurrentDate,
        days,
        month,
        setMonth,
        firstDayYear,
        setFirstDayYear,
        lastDayYear,
        setLastDayYear,
        year,
        setYear,
        setDays,
        currentMonthNumber,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
