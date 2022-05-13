import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import ExpensesContext from "../context/ExpensesContext";
import DateContext from "../context/DateContext";

const DateMode = () => {
  const { byDay, byMonth, byYear, setCallBack } = useContext(ExpensesContext);
  const { setDateMode, currentDate } = useContext(DateContext);

  return (
    <div className="date-mod__date">
      <button
        onClick={() => {
          setDateMode({ day: true, month: false, year: false });
          setCallBack(byDay(currentDate));
        }}
      >
        Day
      </button>
      <button
        onClick={() => {
          setDateMode("Month");
          setCallBack(byMonth);
        }}
      >
        Month
      </button>
      <button
        onClick={() => {
          setDateMode("Year");
          setCallBack(byYear);
        }}
      >
        Year
      </button>
    </div>
  );
};

export default DateMode;
