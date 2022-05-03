import React, { useContext, useEffect, useState, useCallback } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import MyButton from "../MyButton/MyButton";

const Header = () => {
  const {
    currentDate,
    setCurrentDate,
    byDay,
    byMonth,
    byYear,
    setCallBack,
    days,
    setDays,
  } = useContext(ExpensesContext);

  // const getBackwardDate = () => {
  //   const date = currentDate;
  //   const daysAgo = new Date(date.getTime());
  //   daysAgo.setDate(date.getDate() - 1);
  //   setCurrentDate(daysAgo);
  //   setCallBack(byDay());
  //   console.log("date: ", daysAgo.toLocaleDateString("en-US"));
  // };

  // const getForwardDate = () => {
  //   const today = new Date();
  //   console.log(today);
  //   if (
  //     currentDate.toLocaleDateString("en-US") <
  //     today.toLocaleDateString("en-US")
  //   ) {
  //     const daysAgo = new Date(currentDate.getTime());
  //     daysAgo.setDate(currentDate.getDate() + 1);
  //     setCurrentDate(daysAgo);
  //     setCallBack(byDay());
  //     console.log("date: ", daysAgo.toLocaleDateString("en-US"));
  //   }
  // };

  const incrementDate = (e) => {
    e.preventDefault();
    if (
      currentDate.toLocaleDateString("en-US") <
      new Date().toLocaleDateString("en-US")
    ) {
      setDays((prevState) => prevState + 1);
    }
  };

  const decrementDate = (e) => {
    e.preventDefault();
    setDays((prevState) => prevState - 1);
  };

  useEffect(() => {
    setCurrentDate(
      (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    );
  }, [days]);

  useEffect(() => {
    setCallBack(byDay);
  }, [days, currentDate]);

  return (
    <section className={cl.header}>
      <button onClick={(e) => decrementDate(e)}> </button>
      <div className={cl.header__container}>
        <div className={cl.header__money}>
          <div className={cl.money__total}>
            <h1>{currentDate.toLocaleDateString("en-US")}</h1>
          </div>
          <div className={cl.money__expenses}>
            <h6>Today exp</h6>
            <h6>1000</h6>
          </div>
          <div className={cl.money__income}>
            <h6>Money income</h6>
            <h6>700</h6>
          </div>
        </div>
      </div>
      <button onClick={(e) => incrementDate(e)}></button>
    </section>
  );
};

export default Header;
