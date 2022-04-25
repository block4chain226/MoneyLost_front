import React from "react";
import { useContext } from "react";
import "../styles/App.css";
import ExpensesDetailsContext from "../context/ExpenseDetailsContext";

const DateMode = () => {
  const { setDateMode, byDay, byMonth, byYear, setCallBack } = useContext(
    ExpensesDetailsContext
  );

  return (
    <div className="date-mod__date">
      <button
        onClick={() => {
          setDateMode({ day: true, month: false, year: false });
          setCallBack(byDay);
        }}
      >
        Day
      </button>
      <button
        onClick={() => {
          setDateMode({ day: false, month: true, year: false });
          setCallBack(byMonth);
        }}
      >
        Month
      </button>
      <button
        onClick={() => {
          setDateMode({ day: false, month: false, year: true });
          setCallBack(byYear);
        }}
      >
        Year
      </button>
    </div>
  );
};

export default DateMode;
