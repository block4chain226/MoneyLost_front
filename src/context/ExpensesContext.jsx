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
  const [categoryName, setCategoryName] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [callBack, setCallBack] = useState(() => byDay);
  const [titleCategory, setTitleCategory] = useState({});
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [currentYear, setCurrentYear] = useState(currentDate);
  const [dateMode, setDateMode] = useState("Day");
  const [dayExpenses, setDayExpenses] = useState(0);
  const [allIncome, setAllIncome] = useState([]);
  const [dayIncome, setDayIncome] = useState(0);

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
    ///Expenses
    console.log("byDay");
    setDateMode("Day");
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

    ///Incomes
    // console.log("all ", allIncome);
    let totalIncome = 0;
    allIncome.flat().forEach((element) => {
      if (element.date === currentDate.toLocaleDateString("en-US")) {
        totalIncome += +element.incomeAmount;
      }
    });

    setDayIncome(totalIncome);
  }

  const getTotalExpensesByDay = () => {
    let total = Object.entries(titleCategory).map((item) => {
      return item[1].map((elem) => {
        return elem;
      });
    });
    total = total.flat();
    const total2 = total.reduce((acc, elem) => {
      return (acc += elem.moneyAmount);
    }, 0);
    setDayExpenses(total2);
  };

  function byMonth() {
    console.log("byMonth");
    setDateMode("Month");
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const cat = {};
    allExpenses.forEach((element) => {
      if (
        element.date >= firstDayOfMonth.toLocaleDateString("en-US") &&
        element.date <= lastDayOfMonth.toLocaleDateString("en-US")
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });
    setTitleCategory(cat);

    ///Incomes
    // console.log("all ", allIncome);
    let totalIncome = 0;
    allIncome.flat().forEach((element) => {
      if (
        element.date >= firstDayOfMonth.toLocaleDateString("en-US") &&
        element.date <= lastDayOfMonth.toLocaleDateString("en-US")
      ) {
        totalIncome += +element.incomeAmount;
      }
    });

    setDayIncome(totalIncome);
  }
  function byYear() {
    console.log("byYear");
    setDateMode("Year");
  }

  useEffect(() => {
    getTotalExpensesByDay();
  }, [titleCategory, amount]);

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
        allIncome,
        setAllIncome,
        days,
        dayExpenses,
        setDayExpenses,
        setDays,
        dateMode,
        byDay,
        byMonth,
        byYear,
        callBack,
        setCallBack,
        titleCategory,
        setDateMode,
        currentMonth,
        setCurrentMonth,
        currentDate,
        setCurrentDate,
        setTitleCategory,
        month,
        setMonth,
        moneyAmount,
        setMoneyAmount,
        getTotalExpensesByDay,
        dayIncome,
        setDayIncome,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
