import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import ExpensesContext from "../context/ExpensesContext";

const DateMode = () => {
  const { byDay, byMonth, setDateMode, byYear, setCallBack, currentDate } =
    useContext(ExpensesContext);

  return (
    <div className="date-mod__date">
      <button
        onClick={() => {
          setDateMode("Day");
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
