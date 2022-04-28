import React from "react";
import { createContext } from "react";
import { useState } from "react";

const ExpensesContext = createContext();

export const ExpensesContextProvider = ({ children }) => {
  const [switchMode, setSwitchMode] = useState({
    isExpense: true,
    isIncome: false,
  });
  let [amount, setAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [allExpenses, setAllExpenses] = useState([]);

  const [moneyAmount, setMoneyAmount] = useState(0);
  const [callBack, setCallBack] = useState(() => byDay);
  const [titleCategory, setTitleCategory] = useState([]);
  const [dateMode, setDateMode] = useState({
    day: true,
    month: false,
    year: false,
  });

  const addNewExpense = (categor) => {
    console.log("userId= ", sessionStorage.getItem("userId"));
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: sessionStorage.getItem("userId"),
        category: categor,
        date: new Date().toLocaleDateString("en-US"),
        moneyAmount: amount,
      }),
    };
    try {
      const response = fetch("http://localhost:3000/expenses", config).then(
        (res) => res.json()
      );
    } catch (error) {}
  };

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
    Object.values(allExpenses).map((element) => {
      if (
        !titleCategory.includes(element.category) &&
        element.date === new Date().toLocaleDateString("en-US")
      ) {
        setTitleCategory([...titleCategory, element.category]);
      }
    });
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
        byDay,
        byMonth,
        byYear,
        callBack,
        setCallBack,
        titleCategory,
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
