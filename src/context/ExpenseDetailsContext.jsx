import React, { useEffect, useMemo } from "react";
import { createContext } from "react";
import { useContext, useState } from "react";

const ExpensesDetailsContext = createContext();

export const ExpensesDetailsProvider = ({ children }) => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [callBack, setCallBack] = useState(() => byDay);
  const [titleCategory, setTitleCategory] = useState([]);
  const [dateMode, setDateMode] = useState({
    day: true,
    month: false,
    year: false,
  });

  function byDay(element) {
    console.log("byDay");
    Object.values(allExpenses).map((element) => {
      if (
        !titleCategory.includes(element.category) &&
        element.date === new Date().toLocaleDateString("en-US")
      ) {
        setTitleCategory([...titleCategory, element.category]);
      }
    });
  }
  function byMonth() {
    console.log("byMonth");
  }
  function byYear() {
    console.log("byYear");
  }

  return (
    <ExpensesDetailsContext.Provider
      value={{
        allExpenses,
        setAllExpenses,
        dateMode,
        setDateMode,
        byDay,
        byMonth,
        byYear,
        callBack,
        setCallBack,
        titleCategory,
      }}
    >
      {children}
    </ExpensesDetailsContext.Provider>
  );
};

export default ExpensesDetailsContext;
