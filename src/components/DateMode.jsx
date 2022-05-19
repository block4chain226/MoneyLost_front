import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import ExpensesContext from "../context/ExpensesContext";
import DateContext from "../context/DateContext";

const DateMode = () => {
  // const { byDayRef, byMonthRef, byYearRef } = useContext(ExpensesContext);
  const { setDateMode, currentDate } = useContext(DateContext);

  return (
    <div className="date-mod__date">
      <button
        onClick={() => {
          setDateMode({ day: true, month: false, year: false });
        }}
      >
        Day
      </button>
      <button
        onClick={() => {
          setDateMode({ day: false, month: true, year: false });
        }}
      >
        Month
      </button>
      <button
        onClick={() => {
          setDateMode({ day: false, month: false, year: true });
        }}
      >
        Year
      </button>
    </div>
  );
};

export default DateMode;
