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
  const [startMonthCategory, setStartMonthCategory] = useState({});

  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(currentDate);
  const [dateMode, setDateMode] = useState("Day");
  const [dayExpenses, setDayExpenses] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  const [allIncome, setAllIncome] = useState([]);
  const [dayIncome, setDayIncome] = useState(0);

  const lastMonth =
    new Date(currentMonth.toLocaleDateString("en-US")).getMonth() + 1;

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

    // if (dateMode === "Month") {
    //   let ccc = dayExpenses;
    //   setDayExpenses(ccc + amount);
    // }
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

    restoreNewExpenses("tC", setTitleCategory, cat);

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
  ///think how to display newexpense only on lastMonth
  const restoreNewExpenses = (sessionItem, setStateFunc, categoryObj) => {
    if (dateMode === "Day") {
      if (sessionStorage.getItem(sessionItem) !== null) {
        const tempExpenses = JSON.parse(sessionStorage.getItem(sessionItem));
        tempExpenses.map((element) => {
          if (element.date === currentDate.toLocaleDateString("en-US")) {
            if (!categoryObj[element.category]) {
              categoryObj[element.category] = [element];
            } else {
              categoryObj[element.category].push(element);
            }
          }
        });
      }
      setStateFunc(categoryObj);
    }

    if (dateMode === "Month") {
      const curYear = new Date(
        currentMonth.toLocaleDateString("en-US")
      ).getFullYear();
      if (sessionStorage.getItem(sessionItem) !== null) {
        const tempExpenses = JSON.parse(sessionStorage.getItem(sessionItem));
        tempExpenses.map((element) => {
          if (
            new Date(element.date).getMonth() + 1 ===
              new Date(currentMonth.toLocaleDateString("en-US")).getMonth() +
                1 &&
            new Date(element.date).getFullYear() === curYear
          ) {
            if (!categoryObj[element.category]) {
              categoryObj[element.category] = [element];
            } else {
              categoryObj[element.category].push(element);
            }
          }
        });
      }
      setStateFunc(categoryObj);
    }
  };

  const getTotalExpenses = () => {
    let total = Object.entries(titleCategory).map((item) => {
      return item[1].map((elem) => {
        return elem;
      });
    });

    total = total.flat().reduce((acc, elem) => {
      return (acc += elem.moneyAmount);
    }, 0);

    dateMode === "Day" ? setDayExpenses(total) : setMonthExpenses(total);
    // setDayExpenses(total);
  };

  function byMonth(month = currentMonth) {
    console.log("byMonth");
    setDateMode("Month");
    const curYear = new Date(
      currentMonth.toLocaleDateString("en-US")
    ).getFullYear();
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    );
    const cat = {};
    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(firstDayOfMonth).getTime() &&
        new Date(element.date).getTime() <=
          new Date(lastDayOfMonth).getTime() &&
        new Date(element.date).getFullYear() === curYear
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });
    //write start month to lastMonthCategoryTitle and if it not null get categories from it
    restoreNewExpenses("tC", setTitleCategory, cat);

    ///Incomes
    // console.log("all ", allIncome);
    let totalIncome = 0;
    allIncome.flat().forEach((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(firstDayOfMonth).getTime() &&
        new Date(element.date).getTime() <= new Date(lastDayOfMonth).getTime()
      ) {
        totalIncome += +element.incomeAmount;
      }
    });

    // debugger;
    setDayIncome(totalIncome);
  }
  function byYear() {
    console.log("byYear");
    setDateMode("Year");
  }

  useEffect(() => {
    getTotalExpenses();
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
        monthExpenses,
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
        getTotalExpenses,
        dayIncome,
        setDayIncome,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
