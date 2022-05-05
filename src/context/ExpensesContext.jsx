import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

const ExpensesContext = createContext();
const now = new Date();
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

  const [allExpenses, setAllExpenses] = useState([]);

  const [moneyAmount, setMoneyAmount] = useState(0);
  const [callBack, setCallBack] = useState(() => byDay);
  const [titleCategory, setTitleCategory] = useState({});

  // firstDayOfMonth: new Date(now.getFullYear(), now.getMonth(), 1),
  // lastDayOfMonth: new Date(now.getFullYear(), now.getMonth() + 1, 0),
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [currentYear, setCurrentYear] = useState(currentDate);
  const [dateMode, setDateMode] = useState("Day");
  const [dayExpenses, setDayExpenses] = useState(0);

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
    setDateMode("Day");
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
    // setDayExpenses(0);

    setTitleCategory(cat);
  }

  const getTotalAmountByDay = () => {
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
    console.log("total = ", total2);
  };

  function byMonth() {
    // debugger;
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
  }
  function byYear() {
    console.log("byYear");
    setDateMode("Year");
  }

  useEffect(() => {
    getTotalAmountByDay();
  }, [titleCategory]);

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
        getTotalAmountByDay,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
