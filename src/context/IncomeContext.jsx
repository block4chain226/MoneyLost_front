import React, { createContext, useContext, useState } from "react";
import DateContext from "./DateContext";
import ExpensesContext from "./ExpensesContext";

const IncomeContext = createContext();

export const IncomeContextProvider = ({ children }) => {
  const userId = sessionStorage.getItem("userId");

  const [allIncome, setAllIncome] = useState([]);
  const [dayIncome, setDayIncome] = useState(0);
  const [monthIncome, setMonthIncome] = useState(0);
  const [yearIncome, setYearIncome] = useState(0);
  const { amount } = useContext(ExpensesContext);
  const { currentDate, currentYear, currentMonth, dateMode } =
    useContext(DateContext);

  const getAllIncomes = async () => {
    await fetch(`http://localhost:3000/income/${userId}`)
      .then((res) => res.json())
      .then((data) => setAllIncome(data.answer));
  };

  const addNewIncome = () => {
    const newIncome = {
      userId: sessionStorage.getItem("userId"),
      date: dateMode.day
        ? currentDate.toLocaleDateString("en-US")
        : new Date().toLocaleDateString("en-US"),
      incomeAmount: amount,
    };
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newIncome),
    };
    try {
      const response = fetch("http://localhost:3000/income", config).then(
        (res) => res.json()
      );
    } catch (error) {}

    setAllIncome([...allIncome, newIncome]);
  };

  const getDayIncomes = () => {
    let totalDayInc = 0;

    allIncome.map((element) => {
      if (
        new Date(element.date).getTime() ===
        new Date(currentDate.toLocaleDateString("en-US")).getTime()
      ) {
        totalDayInc += +element.incomeAmount;
      }
    });

    setDayIncome(totalDayInc);
  };

  const getMonthIncomes = () => {
    let totalMonthInc = 0;
    const curYear = new Date(
      currentMonth.toLocaleDateString("en-US")
    ).getFullYear();
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

    allIncome.map((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(firstDayOfMonth).getTime() &&
        new Date(element.date).getTime() <=
          new Date(lastDayOfMonth).getTime() &&
        new Date(element.date).getFullYear() === curYear
      ) {
        totalMonthInc += +element.incomeAmount;
      }
    });

    setMonthIncome(totalMonthInc);
  };

  const getYearIncomes = () => {
    let totalYearInc = 0;
    const curYear = new Date(
      currentMonth.toLocaleDateString("en-US")
    ).getFullYear();
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

    allIncome.map((element) => {
      if (
        new Date(element.date).getTime() >=
          new Date(new Date(currentYear.getFullYear(), 0, 1)).getTime() &&
        new Date(element.date).getTime() <=
          new Date(new Date(currentYear.getFullYear(), 11, 31)).getTime()
      ) {
        totalYearInc += +element.incomeAmount;
      }
    });

    setYearIncome(totalYearInc);
  };

  return (
    <IncomeContext.Provider
      value={{
        allIncome,
        dayIncome,
        setAllIncome,
        setDayIncome,
        monthIncome,
        setMonthIncome,
        getAllIncomes,
        getDayIncomes,
        getMonthIncomes,
        addNewIncome,
        yearIncome,
        setYearIncome,
        getYearIncomes,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export default IncomeContext;
