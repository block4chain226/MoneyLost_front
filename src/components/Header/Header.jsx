import React, { useContext, useEffect, useState } from "react";
import cl from "./Header.module.css";
import ExpensesContext from "../../context/ExpensesContext";
import MyButton from "../MyButton/MyButton";

const Header = () => {
  const { currentDate, setCurrentDate } = useContext(ExpensesContext);

  useEffect(() => {
    console.log(currentDate);
  });

  return (
    <section className={cl.header}>
      <button>{currentDate} </button>
      <div className={cl.header__container}>
        <div className={cl.header__money}>
          <div className={cl.money__total}>
            <h1>77877</h1>
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
      <button></button>
    </section>
  );
};

export default Header;
