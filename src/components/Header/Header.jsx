import React, { useContext, useEffect, useState, useCallback } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import DateContext from "../../context/DateContext";
import IncomeContext from "../../context/IncomeContext";

const Header = () => {
  const { monthExpenses, dayExpenses, yearExpenses, setIsUpdate } =
    useContext(ExpensesContext);

  const {
    currentMonth,
    setCurrentMonth,
    dateMode,
    currentDate,
    setCurrentDate,
    setCurrentYear,
    days,
    setDays,
    currentYear,
    month,
    setMonth,
    year,
    setYear,
    decrementDate,
    incrementDate,
  } = useContext(DateContext);

  const {
    allIncome,
    dayIncome,
    monthIncome,
    getAllIncomes,
    getDayIncomes,
    getMonthIncomes,
    getYearIncomes,
    yearIncome,
  } = useContext(IncomeContext);

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 200) {
      incrementDate();
    }

    if (touchStart - touchEnd < 200) {
      decrementDate();
    }
  }

  useEffect(() => {
    if (dateMode.day) {
      setCurrentDate(
        (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      );
    }
    if (dateMode.month) {
      setCurrentMonth(
        (prevState) =>
          new Date(currentMonth.getTime() + month * 1000 * 3600 * 24)
      );
    }
    if (dateMode.year) {
      setCurrentYear(
        (prevState) => new Date(currentYear.getTime() + year * 1000 * 3600 * 24)
      );
    }
  }, [days]);

  useEffect(() => {
    getAllIncomes();
  }, []);

  useEffect(() => {
    if (dateMode.day) {
      setDays(0);
    }
    if (dateMode.month) {
      setMonth(0);
    }
    if (dateMode.year) {
      setYear(0);
    }
  }, [dateMode]);

  useEffect(() => {
    if (dateMode.day) {
      getDayIncomes();
    }
    if (dateMode.month) {
      getMonthIncomes();
    }
    if (dateMode.year) {
      getYearIncomes();
    }
  }, [currentDate, currentMonth, currentYear, dateMode, allIncome]);

  useEffect(() => {
    setIsUpdate(false);
  }, [currentDate, currentMonth, currentYear]);

  return (
    <section
      className={cl.header}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cl.header__container}>
        <div className={cl.header__money}>
          <div className={cl.money__info}>
            <h2 style={{ width: "350px", fontSize: "8vw" }}>
              {dateMode.day
                ? currentDate.toLocaleDateString("en-us", { weekday: "long" }) +
                  ", " +
                  currentDate.toLocaleDateString("en-us", { day: "numeric" }) +
                  " " +
                  currentDate.toLocaleDateString("en-us", { month: "long" })
                : dateMode.month
                ? currentMonth.toLocaleDateString("en-us", { month: "long" }) +
                  " " +
                  currentMonth.getFullYear()
                : currentYear.getFullYear()}
            </h2>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>
              {dateMode.day
                ? "Today expenses"
                : dateMode.month
                ? "Month expenses"
                : "Year expenses"}{" "}
            </h6>
            <h6 style={{ fontSize: "3.5vw" }}>
              {dateMode.day
                ? dayExpenses
                : dateMode.month
                ? monthExpenses
                : yearExpenses}
            </h6>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>
              {dateMode.day
                ? "Day income"
                : dateMode.month
                ? "Month income"
                : "Year income"}{" "}
            </h6>
            <h6 style={{ fontSize: "3.5vw" }}>
              {dateMode.day
                ? dayIncome
                : dateMode.month
                ? monthIncome
                : yearIncome}
            </h6>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>Total </h6>
            <h6 style={{ fontSize: "3.5vw" }}>
              {dateMode.day
                ? +dayIncome - +dayExpenses
                : dateMode.month
                ? +monthIncome - +monthExpenses
                : +yearIncome - +yearExpenses}
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
