import React, { useContext, useEffect, useState } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import MyButton from "../MyButton/MyButton";

const Header = () => {
  const { currentDate, setCurrentDate } = useContext(ExpensesContext);

  const getBackwardDate = () => {
    const date = currentDate;
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - 1);
    setCurrentDate(daysAgo);
    console.log("date: ", daysAgo.toLocaleDateString("en-US"));
  };

  const getForwardDate = () => {
    if (currentDate < new Date()) {
      const daysAgo = new Date(currentDate.getTime());
      daysAgo.setDate(currentDate.getDate() + 1);
      setCurrentDate(daysAgo);
      console.log("date: ", daysAgo.toLocaleDateString("en-US"));
    }
  };

  return (
    <section className={cl.header}>
      <button onClick={getBackwardDate}> </button>
      <div className={cl.header__container}>
        <div className={cl.header__money}>
          <div className={cl.money__total}>
            <h1>78787</h1>
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
      <button onClick={getForwardDate}></button>
    </section>
  );
};

export default Header;
