import React, { useContext, useEffect, useState, useCallback } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import MyButton from "../MyButton/MyButton";
import DateContext from "../../context/DateContext";

const Header = () => {
  const {
    // currentDate,
    // setCurrentDate,
    // dateMode,
    byDay,
    month,
    setMonth,
    byMonth,
    byYear,

    amount,
    setDayIncome,
    setDayExpenses,
    monthExpenses,

    dayExpenses,
    days,
    setDays,
    dayIncome,
    setIsUpdate,
  } = useContext(ExpensesContext);
  const {
    currentMonth,
    setCurrentMonth,
    dateMode,
    setDateMode,
    currentDate,
    setCurrentDate,
    setCurrentYear,
    currentYear,
  } = useContext(DateContext);

  const incrementDate = (e) => {
    e.preventDefault();
    const today = new Date(new Date().getTime()).setUTCHours(0, 0, 0, 0);
    const curMon = new Date(currentMonth.getTime()).setUTCHours(0, 0, 0, 0);

    if (dateMode.month && curMon < today && curMon !== today) {
      setMonth(30);
      setDays((prevState) => prevState + 1);
    }

    if (
      dateMode.day &&
      new Date(currentDate.getTime()).setUTCHours(0, 0, 0, 0) < today
    ) {
      setDays((prevState) => prevState + 1);
    }
  };

  const decrementDate = (e) => {
    e.preventDefault();
    if (dateMode.month) {
      setMonth(-30);
    }

    setDays((prevState) => prevState - 1);
  };

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
  }, [days]);

  useEffect(() => {
    setDays(0);
  }, [dateMode.day]);

  useEffect(() => {
    setIsUpdate(false);
  }, [currentDate, currentMonth, currentYear]);

  return (
    <section className={cl.header}>
      <button onClick={decrementDate}> </button>
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
                : currentMonth.toLocaleDateString("en-us", { month: "long" }) +
                  " " +
                  currentMonth.getFullYear()}
            </h2>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>
              {dateMode.day ? "Today expenses" : "Month expenses"}{" "}
            </h6>
            <h6 style={{ fontSize: "3.5vw" }}>
              {dateMode.day ? dayExpenses : monthExpenses}
            </h6>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>
              {dateMode.day ? "Day income" : "Month income"}{" "}
            </h6>
            <h6 style={{ fontSize: "3.5vw" }}>{dayIncome}</h6>
          </div>
          <div className={cl.money__expenses}>
            <h6 style={{ fontSize: "4vw" }}>Total </h6>
            <h6 style={{ fontSize: "3.5vw" }}>
              {dateMode.day
                ? dateMode.day
                : // ? +dayIncome - +dayExpenses
                  +dayIncome - +monthExpenses}
            </h6>
          </div>
        </div>
      </div>
      <button onClick={(e) => incrementDate(e)}></button>
    </section>
  );
};

export default Header;
