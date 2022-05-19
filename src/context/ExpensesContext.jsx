import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import DateContext from "./DateContext";

const ExpensesContext = createContext();

export const ExpensesContextProvider = ({ children }) => {
  const [switchMode, setSwitchMode] = useState({
    isExpense: true,
    isIncome: false,
  });

  const [expenseId, setExpenseId] = useState(new Date().getTime());
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [month, setMonth] = useState(0);
  const [dayIncome, setDayIncome] = useState(0);
  const [titleCategory, setTitleCategory] = useState({});

  /////////////////////////////////////////////////////////////////////////////////////////

  let [dayExpenses, setDayExpenses] = useState(0);

  const [monthExpenses, setMonthExpenses] = useState(0);
  const [yearExpenses, setYearExpenses] = useState(0);
  const [allExpenses, setAllExpenses] = useState([]);
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const [dayTitleCategory, setDayTitleCategory] = useState({});
  const [monthTitleCategory, setMonthTitleCategory] = useState({});
  const [yearTitleCategory, setYearTitleCategory] = useState({});

  const {
    dateMode,
    setDateMode,
    currentDate,
    currentMonth,
    currentYear,
    setCurrentDate,
  } = useContext(DateContext);

  const addNewExpense = (categor) => {
    setExpenseId(new Date().getTime());
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        userId: sessionStorage.getItem("userId"),
        id: expenseId,
        category: categor,
        date: dateMode.day
          ? currentDate.toLocaleDateString("en-US")
          : new Date().toLocaleDateString("en-US"),
        moneyAmount: amount,
      }),
    };

    try {
      const response = fetch("http://localhost:3000/expenses", config).then(
        (res) => res.json()
      );
    } catch (error) {}
  };

  useEffect(() => {
    setIsUpdate(false);
  }, [currentDate]);

  return (
    <ExpensesContext.Provider
      value={{
        switchMode,
        setSwitchMode,
        amount,
        setAmount,
        categoryName,
        setCategoryName,
        addNewExpense,
        allExpenses,
        dayTitleCategory,
        setAllExpenses,
        days,
        monthExpenses,
        dayExpenses,
        setDayExpenses,
        setDays,
        dateMode,
        titleCategory,
        setDateMode,
        currentDate,
        setCurrentDate,
        setTitleCategory,
        month,
        setMonth,
        setMonthExpenses,
        moneyAmount,
        setMoneyAmount,
        setDayTitleCategory,
        dayIncome,
        setDayIncome,
        isUpdate,
        setIsUpdate,
        monthTitleCategory,
        setMonthTitleCategory,
        setYearExpenses,
        setMonthExpenses,
        yearTitleCategory,
        yearExpenses,
        setYearTitleCategory,
        setYearExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
