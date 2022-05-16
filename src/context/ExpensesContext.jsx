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
  const [startMonthCategory, setStartMonthCategory] = useState({});
  const [month, setMonth] = useState(0);
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [currentYear, setCurrentYear] = useState(currentDate);
  // const [dateMode, setDateMode] = useState("Day");
  // const [allIncome, setAllIncome] = useState([]);
  const [dayIncome, setDayIncome] = useState(0);
  const [isMonthUpdate, setIsMonthUpdate] = useState({ isUpdate: false });
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
    setCurrentMonth,
    currentYear,
    setCurrentDate,
  } = useContext(DateContext);

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

    if (dateMode === "Month") {
      let ccc = monthExpenses;
      setMonthExpenses(ccc + amount);
    }
  };

  const restoreNewExpenses = (sessionItem, setStateFunc, categoryObj) => {
    if (dateMode.day) {
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

  function byDayRef(date) {
    console.log("byDayref");

    const cat = {};

    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() ===
        new Date(currentDate.toLocaleDateString("en-US")).getTime()
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });

    setDayTitleCategory(cat);
  }

  function byMonthRef(month = currentMonth) {
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
    setMonthTitleCategory(cat);
  }

  function byYearRef() {
    console.log(new Date(currentYear, 0, 1));
    console.log(new Date(currentYear, 11, 31));

    const cat = {};
    allExpenses.forEach((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(new Date(currentYear, 0, 1)).getTime() &&
        new Date(element.date).getTime() <=
          new Date(new Date(currentYear, 11, 31)).getTime() &&
        new Date(element.date).getFullYear() === currentYear
      ) {
        if (!cat[element.category]) {
          cat[element.category] = [element];
        } else {
          cat[element.category].push(element);
        }
      }
    });
    setYearTitleCategory(cat);
  }

  useEffect(() => {
    setIsUpdate(false);
  }, [currentDate]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, [isMonthUpdate]);

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
        byDayRef,
        byMonthRef,

        dayTitleCategory,
        setAllExpenses,

        days,
        monthExpenses,
        dayExpenses,
        setDayExpenses,
        setDays,
        dateMode,
        // byDay,
        // byMonth,

        titleCategory,
        setDateMode,
        currentMonth,
        setCurrentMonth,
        currentDate,
        setCurrentDate,
        setTitleCategory,
        month,
        setMonth,
        setMonthExpenses,
        moneyAmount,
        setMoneyAmount,
        // getTotalExpenses,
        dayIncome,
        setDayIncome,
        isMonthUpdate,
        setIsMonthUpdate,
        isUpdate,
        setIsUpdate,
        monthTitleCategory,
        setMonthTitleCategory,
        setYearExpenses,
        setMonthExpenses,
        byYearRef,
        yearTitleCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
