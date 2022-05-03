import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const ExpensesContext = createContext();

export const ExpensesContextProvider = ({ children }) => {
  const [switchMode, setSwitchMode] = useState({
    isExpense: true,
    isIncome: false,
  });
  const [expenseId, setExpenseId] = useState(new Date().getTime());
  const [amount, setAmount] = useState("");

  const [days, setDays] = useState(0);

  // const datenow = new Date().toLocaleDateString("en-US");
  const [categoryName, setCategoryName] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allExpenses, setAllExpenses] = useState([]);

  const [moneyAmount, setMoneyAmount] = useState(0);
  const [callBack, setCallBack] = useState(() => byDay);
  const [titleCategory, setTitleCategory] = useState({});
  const [dateMode, setDateMode] = useState({
    day: true,
    month: false,
    year: false,
  });

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
        date: currentDate.toLocaleDateString("en-US"),
        moneyAmount: amount,
      }),
    };
    try {
      const response = fetch("http://localhost:3000/expenses", config).then(
        (res) => res.json()
      );
    } catch (error) {}
  };

  function byDay() {
    console.log("byDay");
    //{
    // food:[
    // {amount:dfgfdg,date:fdfv}
    // {amount:dfgfdg,date:fdfv}
    // {amount:dfgfdg,date:fdfv}
    // ]
    // }
    const cat = {};
    allExpenses.forEach((element) => {
      if (element.date === currentDate.toLocaleDateString("en-US")) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });

    if (sessionStorage.getItem("tC") !== null) {
      const tempExpenses = JSON.parse(sessionStorage.getItem("tC"));
      tempExpenses.map((element) => {
        if (element.date === currentDate.toLocaleDateString("en-US")) {
          if (!cat[element.category]) {
            cat[element.category] = [element];
          } else {
            cat[element.category].push(element);
          }
        }
      });
    }

    setTitleCategory(cat);
  }

  function byMonth() {
    console.log("byMonth");

    const now = new Date();

    let month = currentDate.getMonth() + 1;
    let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log(firstDay.toLocaleDateString("en-US"));
    const cat = {};
    allExpenses.forEach((element) => {
      if (
        element.date >= firstDay.toLocaleDateString("en-US") &&
        element.date <= lastDay.toLocaleDateString("en-US")
      ) {
        debugger;
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });
    setTitleCategory(cat);
  }
  function byYear() {
    console.log("byYear");
  }

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
        setAllExpenses,
        dateMode,
        setDateMode,
        days,
        setDays,
        byDay,
        byMonth,
        byYear,
        callBack,
        setCallBack,
        titleCategory,
        currentDate,
        setCurrentDate,
        setTitleCategory,
        moneyAmount,
        setMoneyAmount,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
