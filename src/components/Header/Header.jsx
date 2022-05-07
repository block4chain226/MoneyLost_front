import React, { useContext, useEffect, useState, useCallback } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import MyButton from "../MyButton/MyButton";

const Header = () => {
  const {
    currentDate,
    setCurrentDate,
    dateMode,
    byDay,
    month,
    setMonth,
    byMonth,
    byYear,
    currentMonth,
    setDayExpenses,
    setCurrentMonth,
    setCallBack,
    dayExpenses,
    days,
    setDays,
    dayIncome,
  } = useContext(ExpensesContext);

  const incrementDate = (e) => {
    e.preventDefault();

    if (
      dateMode === "Month" &&
      currentMonth.toLocaleDateString("en-US") <
        new Date().toLocaleDateString("en-US")
    ) {
      setMonth(30);
      setDays((prevState) => prevState + 1);
    }
    if (
      dateMode === "Day" &&
      currentDate.toLocaleDateString("en-US") <
        new Date().toLocaleDateString("en-US")
    ) {
      setDays((prevState) => prevState + 1);
    }
  };

  const decrementDate = () => {
    // e.preventDefault();
    setMonth(-30);

    setDays((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (dateMode === "Day") {
      setCurrentDate(
        (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      );
    }
    if (dateMode === "Month") {
      setCurrentMonth(
        // (prevState) => new Date(currentMonth.getTime() - 30 * 1000 * 3600 * 24)
        (prevState) =>
          new Date(currentMonth.getTime() + month * 1000 * 3600 * 24)
      );
    }
  }, [days]);

  useEffect(() => {
    setCallBack(byDay);
  }, [currentDate]);

  useEffect(() => {
    setDays(0);
  }, [dateMode === "Day"]);

  useEffect(() => {
    setCallBack(byMonth);
    // setDays(0);
  }, [currentMonth]);

  useEffect(() => {
    setDayExpenses(0);
  }, [currentDate]);

  return (
    <section className={cl.header}>
      <button onClick={decrementDate}> </button>
      <div className={cl.header__container}>
        <div className={cl.header__money}>
          <div className={cl.money__total}>
            <h1>
              {dateMode === "Day"
                ? currentDate.toLocaleDateString("en-US")
                : currentMonth.toLocaleDateString("en-US")}
            </h1>
          </div>
          <div className={cl.money__expenses}>
            <h6>Today exp</h6>
            <h6>{dayExpenses}</h6>
          </div>
          <div className={cl.money__income}>
            <h6>Day Income</h6>
            <h6>{dayIncome}</h6>
          </div>
        </div>
      </div>
      <button onClick={(e) => incrementDate(e)}></button>
    </section>
  );
};

export default Header;
